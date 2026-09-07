const Footer = ({ currentYear }) => {
  return (
    <footer className="footer" id="footer">
      <p>&copy; {currentYear} CodeBridge Academy. All rights reserved.</p>
      <p>Instructor: Maya Patel | Building confident software developers.</p>
    </footer>
  );
};

export default Footer;
