import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { AppointmentListItem, Therapist } from "@shared/api";

export default function AdminAppointments() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const dateStr = useMemo(() => (date ? format(date, "yyyy-MM-dd") : ""), [date]);

  const { data: therapists } = useQuery<Therapist[]>({
    queryKey: ["therapists"],
    queryFn: async () => {
      const res = await fetch(`/api/appointments/therapists`);
      if (!res.ok) throw new Error("无法获取理疗师");
      return res.json();
    },
  });

  const { data: list } = useQuery<AppointmentListItem[]>({
    queryKey: ["appointments", dateStr],
    queryFn: async () => {
      const res = await fetch(`/api/appointments?date=${dateStr}`);
      if (!res.ok) throw new Error("无法获取预约数据");
      return res.json();
    },
    enabled: !!dateStr,
  });

  return (
    <div className="container py-12 space-y-8">
      <h1 className="text-3xl font-bold">预约管理</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>选择日期</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} locale={zhCN} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>当日预约</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(list ?? []).length === 0 && <div className="text-sm text-muted-foreground">暂无预约</div>}
              {list?.sort((a,b)=> a.time.localeCompare(b.time)).map((b) => (
                <div key={b.id} className="rounded-lg border p-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{b.time} · {b.duration}分钟 · {b.service}</div>
                    <div className="text-xs text-muted-foreground">{b.name} · {b.phone}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{therapists?.find(t=>t.id===b.therapistId)?.name ?? "未分配"}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
