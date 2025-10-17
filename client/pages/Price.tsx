export default function Price() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Massage Price List</h1>
      
      <div className="max-w-2xl mb-12">
        <h2 className="text-2xl font-semibold mb-6">Full body relaxation oil massage</h2>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-lg">30 Minutes</span>
            <span className="text-lg font-semibold">$50</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-lg">45 Minutes</span>
            <span className="text-lg font-semibold">$70</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-lg">60 Minutes</span>
            <span className="text-lg font-semibold">$80</span>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <span className="text-lg">90 Minutes</span>
            <span className="text-lg font-semibold">$130</span>
          </div>
        </div>

        <div className="bg-card p-6 rounded-lg border">
          <h3 className="font-semibold mb-4">Visit Us</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p><span className="font-medium text-foreground">Address:</span> 135 Mann Street Gosford NSW 2250 - 0435291625</p>
            <p><span className="font-medium text-foreground">Address:</span> 92 Pacific Highway Wyong NSW 2259 - 0452648896</p>
          </div>
        </div>
      </div>
    </div>
  );
}
