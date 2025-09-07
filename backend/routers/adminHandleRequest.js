const express = require('express');
const router = express.Router();
const Extension = require('../models/Extension');
const User = require('../models/userModel');
const sendMail = require('../utils/sendMail');

// Approve or reject extension request
router.put('/handle-request/:id', async (req, res) => {
  const { action } = req.body;
  try {
    const extension = await Extension.findById(req.params.id);
    if (!extension) return res.status(404).json({ message: 'Extension not found' });

    let userEmail = null;
    if (extension.user) {
      const user = await User.findById(extension.user);
      userEmail = user?.email;
    }

    if (action === 'approve') {
      extension.published = true;
      await extension.save();
      // Send acceptance email
      if (userEmail) {
        await sendMail({
          to: userEmail,
          subject: 'Your Extension Request Has Been Approved',
          text: `Congratulations! Your extension "${extension.name}" has been approved and is now live on ExtendEase.`,
          html: `<p>Congratulations! Your extension <b>${extension.name}</b> has been <span style="color:green">approved</span> and is now live on ExtendEase.</p>`
        });
      }
      return res.json({ message: 'Extension approved and published', extension });
    } else if (action === 'reject') {
      // Send rejection email before deletion
      if (userEmail) {
        await sendMail({
          to: userEmail,
          subject: 'Your Extension Request Was Rejected',
          text: `We regret to inform you that your extension "${extension.name}" was rejected. Please review your submission and try again if needed.`,
          html: `<p>We regret to inform you that your extension <b>${extension.name}</b> was <span style="color:red">rejected</span>. Please review your submission and try again if needed.</p>`
        });
      }
      await Extension.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Extension request rejected and deleted', userEmail });
    } else {
      return res.status(400).json({ message: 'Invalid action' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
