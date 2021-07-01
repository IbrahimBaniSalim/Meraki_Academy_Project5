const db = require("./../../db/db");

const getAllUsers = (req, res) => {
  const { roleId, type } = req.query;
  const command = `SELECT * FROM users 
  INNER JOIN sports ON  users.role_id =? AND sports.type=? AND sports.is_deleted = 0 AND users.is_deleted =0;`;
  const data = [roleId, type];
  db.query(command, data, (err, result) => {
    if (err) return res.status(404);
    res.status(200);
    res.json(result);
  });
};

const getAllUsersPost = (req, res) => {
  const command = `SELECT users_posts.user_id , users_posts.post_id 
  , posts.poster_id , users.firstName From users_posts
  INNER JOIN posts ON users_posts.post_id = posts.post_id AND users_posts.is_deleted =0
  INNER JOIN users ON users.user_id = users_posts.user_id`;

  db.query(command, (err, result) => {
    if (err) return res.status(404);
    res.status(200);
    res.json(result);
  });
};

const getProfileById = (req, res) => {
  const command = `
    SELECT * FROM users 
    WHERE user_id= ? AND is_deleted=0;`;
  const arr = [req.params.id];
  db.query(command, arr, (err, result) => {
    if (err) return res.status(404);
    res.json(result);
    res.status(200);
  });
};

const updateProfile = (req, res) => {
  const ProfileObj = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    image: req.body.image,
    phone: req.body.phone,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
  };
  const command = `
    UPDATE users
    SET firstName='?', lastName='?',image='?',phone='?',age='?', email='?', password='?'
    WHERE user_id=?; `;
  const arr = [req.params.id];
  const data = [
    ProfileObj.firstName,
    ProfileObj.lastName,
    ProfileObj.image,
    ProfileObj.phone,
    ProfileObj.age,
    ProfileObj.email,
    ProfileObj.password,
  ];

  db.query(command, arr, data, (err, result) => {
    if (err) return res.status(500);
    res.json(result);
    res.status(200);
  });
};

const deleteProfile = (req, res) => {
  const command = `
    DELETE FROM users
    WHERE user_id= ? AND is_deleted=0;
    `;

  const arr = [req.params.id];
  db.query(command, arr, (err, result) => {
    if (err) return res.status(404);
    res.status(200);
    res.json(result);
  });
};

const deleteFromUserPosts = (req, res) => {
  const { userId, postId } = req.body;
  const command = `UPDATE users_posts SET is_deleted =1 where user_id =? AND post_id = ?`;
  data = [userId, postId];
  db.query(command, data, (err, result) => {
    if (err) return res.status(404);
    res.status(200);
    res.json(result);
  });
};
module.exports = {
  getAllUsers,
  getProfileById,
  updateProfile,
  deleteProfile,
  getAllUsersPost,
  deleteFromUserPosts,
};
