const Password = require('../models/Password');
const { encryptPassword, decryptPassword } = require('../utils/encryption');
const { fetchWebsiteLogo } = require('../utils/logoFetcher');

exports.getAllPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user.id });
    res.json(passwords);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching passwords' });
  }
};

exports.createPassword = async (req, res) => {
  try {
    const { name, username, email, password, website, note } = req.body;
    
    const encryptedPassword = await encryptPassword(password);
    const logo = await fetchWebsiteLogo(website);
    
    const newPassword = new Password({
      user: req.user.id,
      name,
      username,
      email,
      password: encryptedPassword,
      website,
      logo,
      note
    });

    const savedPassword = await newPassword.save();
    res.json(savedPassword);
  } catch (err) {
    res.status(500).json({ error: 'Error creating password' });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { name, username, email, password, website, note } = req.body;
    
    const passwordFields = {
      name,
      username,
      email,
      website,
      note,
      updatedAt: Date.now()
    };

    if (password) {
      passwordFields.password = await encryptPassword(password);
    }

    const updatedPassword = await Password.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: passwordFields },
      { new: true }
    );

    res.json(updatedPassword);
  } catch (err) {
    res.status(500).json({ error: 'Error updating password' });
  }
};

exports.deletePassword = async (req, res) => {
  try {
    await Password.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user.id 
    });
    res.json({ message: 'Password deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting password' });
  }
}; 