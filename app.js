const express = require('express')
var favicon = require('serve-favicon')
const sql = require('mssql')
const session = require('express-session')
const MssqlStore = require('connect-mssql')(session)
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const promisify = require('es6-promisify')
const expressValidator = require('express-validator')
const routes = require('./routes')
const helpers = require('./helpers')
const errorHandlers = require('./handlers/errorHandlers')
require('./handlers/passport')
const mssqlConfig = require('./db')

const app = express()

app.use(favicon(path.join(__dirname, 'public/images', 'apple.ico')))

app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(expressValidator())

app.use(cookieParser())

const options = {
  table: 'Sessions',
  ttl: 3600,
  autoRemoveInterval: 3600,
  autoRemoveCallback: function() { console.log('Expired sessions were removed') }
}

app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MssqlStore(mssqlConfig, options)
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  req.login = promisify(req.login, req)
  next()
})

app.use( async (req, res, next) => {
  res.locals.h = helpers
  res.locals.user = req.user || null
  res.locals.currentPath = req.path
  if (['articles', 'blog', 'checkout', 'cart', 'account'].some(item => req.path.includes(item))) {
    const categoriesQuery =
      ` SELECT DISTINCT(C.ID), C.Name FROM ArticleCategories C
        JOIN ArticlesAndCategories ON C.ID = ArticlesAndCategories.CategoryID
      `
    const tagsQuery =
      ` SELECT DISTINCT TOP 10 T.ID, T.Name FROM ArticleTags T
        JOIN ArticlesAndTags ON T.ID = ArticlesAndTags.TagID
      `
    const [ { recordset: categories }, { recordset: tags } ] = await Promise.all([ new sql.Request().query(categoriesQuery), new sql.Request().query(tagsQuery) ])
    res.locals.categories = categories
    res.locals.tags = tags
  }
  next()
})

app.use('/', routes)

app.use(errorHandlers.notFound)

if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors)
}

app.use(errorHandlers.productionErrors)

module.exports = app
