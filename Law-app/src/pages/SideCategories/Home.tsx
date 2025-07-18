
import { useEffect, useState } from "react";
import hero from "../../assets/hero.png";
import "./Home.css";

import Tanzania from "../../assets/Tanzania-judiciary.png"
import Kenya from "../../assets/Kenya-judiciary.png"
import Uganda from "../../assets/Uganda-judiciary.png"
import Us from "../../assets/us-judiciary.png"
import Uk from "../../assets/uk-judiciary.png"

const Home = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?q=law+OR+judge+OR+museveni+OR+lawyer+uganda+OR+kenya+OR+uk+OR+tanzania+rights+OR+offence+OR+ICJ+OR+construction+OR+terrorism+OR+legal+OR+court&language=en&apiKey=48a48d8a043f48cab10c170f8e79d3fd"
        );
        const data = await response.json();

        if (data.status === "ok" && data.articles) {
          setNews(data.articles);
        } else {
          setError("No news found.");
        }
      } catch (err) {
        console.error("News fetch error:", err);
        setError("Failed to load legal news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);


  /*second Api*/
    const [prominentNews, setProminentNews] = useState<any[]>([]);
  const [prominentLoading, setProminentLoading] = useState(true);
  const [prominentError, setProminentError] = useState("");

  useEffect(() => {
    const fetchProminentNews = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?q=law+OR+bobiwine+OR+besigye+OR+judge+OR+museveni+OR+lawyer+uganda+OR+kenya+OR+uk+OR+tanzania+rights+OR+offence+OR+ICJ+OR+construction+OR+terrorism+OR+legal+OR+court&language=en&apiKey=48a48d8a043f48cab10c170f8e79d3fd"
        );
        const data = await response.json();

        if (data.status === "ok" && data.articles) {
          setProminentNews(data.articles);
        } else {
          setProminentError("No prominent events found.");
        }
      } catch (err) {
        console.error("Prominent events fetch error:", err);
        setProminentError("Failed to load prominent legal events.");
      } finally {
        setProminentLoading(false);
      }
    };

    fetchProminentNews();
  }, []);



  return (
    <>
      <div className="home-container">
        {/* Left side - static image with caption */}
        <div className="left-image">
          <img src={hero} alt="International Court of Justice" className="hero-image" />
          <div className="image-caption">
            Trinity Advocates Ensures Justice For All, which has its seat in Kampala,
            it's a probonol organ in Uganda.
          </div>
        </div>

        {/* Right side - scrollable news content */}
        <div className="right-news">
          <h4>LATEST LEGAL NEWS</h4>

          <div className="news-scroll">
            {loading ? (
              <p>Loading news...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : news.length > 0 ? (
              <>
                <div className="featured-news">
                  <h3>{news[0]?.title}</h3>
                  {news[0]?.publishedAt && (
                    <p className="news-date">
                      {new Date(news[0].publishedAt).toLocaleDateString()}
                    </p>
                  )}
                  <p className="news-content">
                    {news[0]?.description || "No description available"}
                  </p>
                  <a
                    href={news[0]?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="read-more"
                  >
                    Read more
                  </a>
                </div>

                {news.slice(1).map((item, i) => (
                  <div key={i} className="news-item">
                    <h4>{item.title}</h4>
                    {item.publishedAt && (
                      <p className="news-date">
                        {new Date(item.publishedAt).toLocaleDateString()}
                      </p>
                    )}
                    <p className="news-content">
                      {item.description || "No description available"}
                    </p>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="read-more"
                    >
                      Read more...
                    </a>
                  </div>
                ))}
              </>
            ) : (
              <p>No news available</p>
            )}
          </div>

          <h2 className="decisions-heading">LATEST DECISIONS</h2>
          <div className="decisions-placeholder">
            <p>Latest court decisions will be displayed here</p>
          </div>
        </div>
      </div>

      {/* ✅ LAW REPORT SECTION BELOW THE HERO-N-NEWS SPLIT */}
<div className="law-reports-section">
  <h2 className="law-reports-heading">NATIONAL LAW REPORTS</h2>

  <div className="law-reports-grid">
    {/* Top Row */}
    <a href="https://judiciary.go.ug/data/smenu/25/Law%20Reporting.html" target="_blank" rel="noopener noreferrer" className="law-card-link">
      <div className="law-card">
        <img src={Uganda} alt="ULII Uganda" />
        <h4>Uganda</h4>
        <h6>Explore Uganda's Law Report</h6>
      </div>
    </a>

    <a href="https://kenyalaw.org/kl/" target="_blank" rel="noopener noreferrer" className="law-card-link">
      <div className="law-card">
        <img src={Kenya} alt="Kenya Law" />
        <h4>Kenya</h4>
        <h6>Explore Kenya's Law Report</h6>
      </div>
    </a>

    <a href="https://www.iclr.co.uk/products/law-report-series/the-law-reports/" target="_blank" rel="noopener noreferrer" className="law-card-link">
      <div className="law-card">
        <img src={Uk} alt="UK Judiciary" />
        <h4>United Kingdom</h4>
        <h6>Explore England's Law Report</h6>
      </div>
    </a>

    {/* Bottom Row */}
    <a href="https://www.tanzlii.org/" target="_blank" rel="noopener noreferrer" className="law-card-link bottom-span">
      <div className="law-card">
        <img src={Tanzania} alt="TanzLII" />
        <h4>Tanzania</h4>
        <h6>Explore Tanzania's Law Report</h6>
      </div>
    </a>

    <a href="https://www.supremecourt.gov/" target="_blank" rel="noopener noreferrer" className="law-card-link bottom-span">
      <div className="law-card">
        <img src={Us} alt="SCOTUS USA" />
        <h4>USA</h4>
        <h6>Explore Us's Law Report</h6>
      </div>
    </a>
  </div>
</div>


 {/* ✅ PROMINENT LEGAL EVENTS SECTION */}
      <div className="prominent-events-section">
        <h2 className="prominent-events-heading"> LEGAL EVENTS</h2>

        <div className="prominent-events-grid">
          {prominentLoading ? (
            <p>Loading prominent events...</p>
          ) : prominentError ? (
            <p className="error-message">{prominentError}</p>
          ) : prominentNews.length > 0 ? (
            prominentNews.map((item, i) => (
              <div key={i} className="event-card">
                {item.urlToImage && (
                  <img src={item.urlToImage} alt="event" className="event-image" />
                )}
                <div className="event-content">
                  <h4>{item.title}</h4>
                  {item.publishedAt && (
                    <p className="event-date">
                      {new Date(item.publishedAt).toLocaleDateString()}
                    </p>
                  )}
                  <p>{item.description || "No description available."}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="read-more-event"
                  >
                    Read more ...
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>No prominent events found.</p>
          )}
        </div>
      </div>




    </>
  );
};

export default Home;
