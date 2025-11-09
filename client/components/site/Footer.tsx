export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-semibold text-lg">Amazing Massage</div>
          <p className="text-sm text-muted-foreground mt-3">
            Professional massage therapy for relaxation, recovery, and wellbeing.
          </p>
        </div>
        <div>
          <div className="font-medium mb-3">Hours</div>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>Wyong: 8:00 AM – 10:30 PM (Mon–Sun)</li>
            <li>Gosford: 9:00 AM – 9:00 PM (Mon–Sun)</li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-3">Contact</div>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>Wyong: <a href="tel:0452648896" className="text-primary hover:underline">0452 648 896</a></li>
            <li>Gosford: <a href="tel:0435291625" className="text-primary hover:underline">0435 291 625</a></li>
            <li>Wyong: 92 Pacific Hwy, Wyong NSW 2259</li>
            <li>Gosford: 135 Mann St, Gosford NSW 2250</li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container py-6 text-xs text-muted-foreground flex flex-col sm:flex-row gap-2 sm:gap-0 items-center justify-between">
          <div>© {new Date().getFullYear()} Amazing Massage</div>
          <div>Made with ❤️</div>
        </div>
      </div>
    </footer>
  );
}
