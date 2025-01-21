'use client';

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { addDays, format } from "date-fns";
import { sv } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { cn } from "@/libs/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  locale?: string;
  showCompare?: boolean;
  align?: "start" | "center" | "end";
}

export function DateRangePicker({
  className,
  locale = "en",
  showCompare = false,
  align = "start",
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const [compareDate, setCompareDate] = React.useState<DateRange | undefined>();
  const [showCompareDates, setShowCompareDates] = React.useState(false);

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", { locale: locale === "sv" ? sv : undefined })} -{" "}
                  {format(date.to, "LLL dd, y", { locale: locale === "sv" ? sv : undefined })}
                </>
              ) : (
                format(date.from, "LLL dd, y", { locale: locale === "sv" ? sv : undefined })
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={locale === "sv" ? sv : undefined}
          />

          {showCompare && (
            <div className="border-t p-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="compare"
                  checked={showCompareDates}
                  onCheckedChange={setShowCompareDates}
                />
                <Label htmlFor="compare">Compare with previous period</Label>
              </div>

              {showCompareDates && (
                <div className="mt-4">
                  <Calendar
                    mode="range"
                    defaultMonth={compareDate?.from}
                    selected={compareDate}
                    onSelect={setCompareDate}
                    numberOfMonths={2}
                    locale={locale === "sv" ? sv : undefined}
                  />
                </div>
              )}
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
} 