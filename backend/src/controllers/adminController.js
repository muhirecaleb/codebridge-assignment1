const pool = require("../config/db");

exports.dashboard = async (req, res) => {
  const [[stats]] = await Promise.all([
    pool.execute(`
      SELECT
        (SELECT COUNT(*) FROM users) AS users,
        (SELECT COUNT(*) FROM users WHERE role = 'student') AS students,
        (SELECT COUNT(*) FROM courses) AS courses,
        (SELECT COUNT(*) FROM enrollments) AS enrollments
    `),
  ]);

  const [recentEnrollments] = await pool.execute(`
    SELECT e.id, e.enrolled_at, u.full_name, u.email, c.title, c.category
    FROM enrollments e
    INNER JOIN users u ON u.id = e.user_id
    INNER JOIN courses c ON c.id = e.course_id
    ORDER BY e.enrolled_at DESC
    LIMIT 12
  `);

  return res.json({ success: true, data: { stats, recentEnrollments } });
};
