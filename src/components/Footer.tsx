export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Telelogic</div>
          <p className="text-primary-foreground/80 mb-4">
            Unified Communications & AI Solutions
          </p>
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Telelogic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
