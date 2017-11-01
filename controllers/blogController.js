//.replace(/\s{2,}/g, ' ') Убрать пробелы и табуляцию

const sql = require('mssql')

exports.updateArticle = async (req, res) => {
	const { photo, name, quote, desc, categories, tags } = req.body
	const { id = 0 } = req.params
	const query = 
		` EXEC AddArticle
				@ID = ${id},
				@Photo = '${photo}',
				@Name = '${name}',
				@Quote = '${quote}',
				@Text = '${desc}',
				@Categories = '${categories}',
				@Tags = '${tags}'
		`
	await new sql.Request().query(query)
	res.send(`Статья успешно ${id === 0 ? 'добавлена' : 'обновлена'}!`)
}

exports.getBlog = async (req, res) => {
	const { sort = 'ID' } = req.query
	const { page = 1, category = 0, tag = 0 } = req.params
	const limit = 3
	const skip = ( page * limit ) - limit
	const query = 
		`EXECUTE BlogPagination 
			@Page = ${page},
			@Limit = ${limit},
			@SortColumn = '${sort}',
			@CategoryID = ${category},
			@TagID = ${tag}
		`
	const [ { recordset: articles }, { recordset: [ { count = 0 } ] } ] = await Promise.all([new sql.Request().query(query), new sql.Request().query(`SELECT COUNT(*) AS count FROM Articles ${category === 0 ? '' : `JOIN ArticlesAndCategories C ON Articles.ID = C.ArticleID WHERE C.CategoryID = ${category}`}`)/*, new sql.Request().query(categoriesQuery)*/])
	const pages = Math.ceil( count / limit )
	if (req.query.axs) {
		if (!articles.length && skip) return
		res.render('partials/articlesList', { name: 'blog', articles, page, pages, count, sort, category }, (err, html) => res.send(html))
	} else {
		if (!articles.length && skip) return res.redirect(`/blog/pages/${pages}`)
		res.render('blog', { name: 'blog', articles, page, pages, count, sort, category })
	}	
}

exports.getArticle = async (req, res) => {
	const { id } = req.params
	const tagsQuery = 
		`	SELECT T.Name, T.ID FROM ArticlesAndTags
			JOIN ArticleTags T ON T.ID = ArticlesAndTags.TagID
			WHERE ArticleID = ${id}
		`
	const categoriesQuery =
		`	SELECT C.Name, C.ID FROM ArticlesAndCategories
			JOIN ArticleCategories C ON C.ID = ArticlesAndCategories.CategoryID
			WHERE ArticleID = ${id}
		`
	const [ { recordset: [ article ] }, { recordset: articleTags }, { recordset: articleCategories } ] = await Promise.all([new sql.Request().query(`SELECT * FROM Articles WHERE ID = ${id}`), new sql.Request().query(tagsQuery), new sql.Request().query(categoriesQuery)])
	res.render('article', { name: 'article', article, articleTags, articleCategories })
}