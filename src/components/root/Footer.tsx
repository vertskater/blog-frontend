import "../../styles/Footer.css";
import githubIcon from "/github.svg";
import twitterIcon from "/twitter-x.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <a
        href="https://github.com/vertskater"
        target="_blank"
        rel="noopener noreferrer"
      >
        &copy; Christoph Mitterwallner
      </a>
      <div className="social-links">
        <a
          href="https://github.com/vertskater"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={githubIcon} alt="GitHub" />
        </a>
        <a
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={twitterIcon} alt="Twitter" />
        </a>
        {/* Add more social links as needed */}
      </div>
    </footer>
  );
}
