function validateArticleData(req, res, next) {
    const { title, content, category, status } = req.body;
    if (!title || title.length < 20) {
      return res.status(400).json({ message: 'Title is required and must be at least 20 characters long.' });
    }
    if (!content || content.length < 200) {
      return res.status(400).json({ message: 'Content is required and must be at least 200 characters long.' });
    }
    if (!category || category.length < 3) {
      return res.status(400).json({ message: 'Category is required and must be at least 3 characters long.' });
    }
    if (!['publish', 'draft', 'thrash'].includes(status)) {
      return res.status(400).json({ message: 'Status is required and must be one of "publish", "draft", or "thrash".' });
    }
    next(); // Move to the next middleware or route handler
  }
  
  module.exports = { validateArticleData };
  