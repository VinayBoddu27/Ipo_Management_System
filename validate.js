function requireFields(fields = []) {
  return (req, res, next) => {
    const missing = fields.filter(f => typeof req.body[f] === 'undefined');
    if (missing.length) return res.status(400).json({ error: `Missing fields: ${missing.join(', ')}` });
    next();
  };
}

module.exports = { requireFields };
