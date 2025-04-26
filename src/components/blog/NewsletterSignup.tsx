
const NewsletterSignup = () => {
  return (
    <div className="mt-24 glass rounded-xl p-8 text-center max-w-4xl mx-auto fade-up">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
      <p className="text-lg text-muted-foreground mb-6">
        Get the latest industry insights and tips delivered directly to your inbox.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
        <input
          type="email"
          placeholder="Your email address"
          className="flex-1 px-4 py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsletterSignup;
