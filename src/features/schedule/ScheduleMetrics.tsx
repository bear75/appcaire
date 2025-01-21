import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const metrics = [
  {
    title: 'Schemalagda besök',
    value: '42',
    description: 'Idag',
    progress: 80,
  },
  {
    title: 'Personal i tjänst',
    value: '12',
    description: 'Av 15 totalt',
    progress: 75,
  },
  {
    title: 'Restid',
    value: '45 min',
    description: 'Genomsnitt per besök',
    progress: 65,
  },
  {
    title: 'Effektivitet',
    value: '72%',
    description: 'Besökstid vs. total tid',
    progress: 72,
  },
];

export default function ScheduleMetrics() {
  return (
    <>
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-muted-foreground">
              {metric.description}
            </p>
            <Progress
              value={metric.progress}
              className="mt-2"
              indicatorClassName={
                metric.progress >= 70
                  ? 'bg-green-500'
                  : metric.progress >= 50
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }
            />
          </CardContent>
        </Card>
      ))}
    </>
  );
}
