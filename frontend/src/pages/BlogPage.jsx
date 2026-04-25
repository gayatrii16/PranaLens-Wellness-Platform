import { useEffect, useState } from "react";
import { apiRequest } from "../lib/api";

function BlogPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    apiRequest("/content/blog").then(setPosts).catch(() => setPosts([]));
  }, []);
  return (
    <div className="page">
      <section className="inner-hero glass-card">
        <span className="eyebrow">Knowledge Hub</span>
        <h1>Wellness education for modern lifestyles and institutions</h1>
        <p>Browse practical articles on preventive care, burnout prevention, Ayurveda-informed routines, and organizational wellbeing.</p>
      </section>
      <section className="content-section">
        <div className="card-grid">
          {posts.map((post) => (
            <article key={post.id} className="glass-card blog-card">
              <div className="blog-meta">
                <span>{post.category}</span>
                <span>{post.readTime}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="blog-footer">
                <span>{post.author}</span>
                <span>{post.publishedAt}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BlogPage;
