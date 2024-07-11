const userInfo = async (req, res) => {
  try {
    const user = req.user;
    console.log(user);
    res.status(200).json({ user });
  } catch (error) {
    console.error('Error in getUserInfo:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { userInfo };

