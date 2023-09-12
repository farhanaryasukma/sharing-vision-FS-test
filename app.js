const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { validateArticleData} = require("./middleware/validateData")

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("halo")
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
    res.status(201).json(newArticle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint 2: Menampilkan seluruh article dengan paging
app.get('/article/:limit/:offset', async (req, res) => {
  try {
    const { limit, offset } = req.params;
    const paginatedArticles = await prisma.posts.findMany({
      skip: parseInt(offset),
      take: parseInt(limit),
    })
    res.json(paginatedArticles);
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
    res.json(article);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint 4: Merubah data article dengan id yang di-request
app.put('/article/:id', validateArticleData, async (req, res) => {
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
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
  res.json({status: "Update successful", article});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Endpoint 5: Menghapus data article dengan id yang di request
app.delete('/article/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArticle = await prisma.posts.delete({
      where: {
        id: parseInt(id),
      },
    });

    if (!deletedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.json({ message: 'Article deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});