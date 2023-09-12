const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { validateArticleData} = require("./middleware/validateData")

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get("/", async (req, res) => {
  try {
    const articlesPublish = await prisma.posts.findMany({
      where: {
        status: "publish"
      },
    });
    const articlesDraft = await prisma.posts.findMany({
      where: {
        status: "draft"
      },
    });
    const articlesThrash = await prisma.posts.findMany({
      where: {
        status: "thrash"
      },
    });
    if (!articlesPublish) {
      return res.status(404).json({ message: 'Article publish not found' });
    }
    if (!articlesDraft) {
      return res.status(404).json({ message: 'Article draft not found' });
    }
    if (!articlesThrash) {
      return res.status(404).json({ message: 'Article thrash not found' });
    }
    res.render("index", {articlesPublish, articlesDraft, articlesThrash})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

// Endpoint 1: Membuat article baru
app.post('/article', validateArticleData, async (req, res) => {
  try {
    const { title, content, category, status } = req.body;
    const newArticle = await prisma.posts.create({
      data: {
        title,
        content,
        category,
        status,
        created_date: new Date(),
        updated_date: new Date()
      },
    });
    res.redirect("/")
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get("/new-post", (req, res) => {
  res.render("addNew")
}
)
// Endpoint 2: Menampilkan seluruh article dengan paging
app.get('/article/:limit/:offset', async (req, res) => {
  try {
    const { limit, offset } = req.params;
    const limitNum = parseInt(limit);
    const offsetNum = parseInt(offset);
    const publishedArticles = await prisma.posts.findMany({
      where: {
        status: "publish"
      },
      skip: parseInt(offset),
      take: parseInt(limit),
    })
    const prevPage = offsetNum - limitNum >= 0 ? offsetNum - limitNum : null;
    const nextPage = offsetNum + limitNum <= publishedArticles.length? offsetNum + limitNum : null;
    res.render('preview', {
      publishedArticles,
      limit: limitNum,
      prevPage,
      nextPage,
  });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint 3: Menampilkan article dengan id yang di-request
app.get('/article/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const article = await prisma.posts.findUnique({
    where: {
      id: parseInt(id),
    },
  })
    res.render("edit", {article});
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint 4: Merubah data article dengan id yang di-request
app.post('/article/:id', validateArticleData, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, status } = req.body;
    const article = await prisma.posts.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title, content, category, status
      }
    })
    res.redirect("/")
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint 5: Menghapus data article dengan id yang di request
app.delete('/article/:id', async (req, res) => {
  const status = "thrash"
  try {
    const { id } = req.params;
    const article = await prisma.posts.update({
      where: {
        id: parseInt(id),
      },
      data: {
        status
      }
    })

    res.redirect("/", { message: 'Article move to thrash' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
