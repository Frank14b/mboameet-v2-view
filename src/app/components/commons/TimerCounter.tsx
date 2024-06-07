import React, { useCallback, useEffect, useState } from "react";

export type TimeDifference = {
  ms: string;
  ss: string;
  mm: string;
  hh: string;
  dd: string;
};

export const formatTimeDifference = (
  initEndDate: Date
): TimeDifference | null => {
  const difference = initEndDate.getTime() - new Date().getTime();

  if (difference <= 0) return null;

  const ms = difference % 1000;
  const ss = Math.floor(difference / 1000) % 60;
  const mm = Math.floor(difference / 1000 / 60) % 60;
  const hh = Math.floor(difference / 1000 / 60 / 60);
  const dd = Math.floor(difference / 1000 / 60 / 60 / 24);

  return {
    ms: ms > 9 ? `${ms}` : `0${ms}`,
    ss: ss > 9 ? `${ss}` : `0${ss}`,
    mm: mm > 9 ? `${mm}` : `0${mm}`,
    hh: hh > 9 ? `${hh}` : `0${hh}`,
    dd: dd > 9 ? `${dd}` : `0${dd}`,
  };
};

export type FormatType = "hours" | "minutes" | "seconds";

export default function TimerCounter({
  children,
  options,
}: {
  children: React.ReactNode;
  options: {
    duration?: number;
    format?: FormatType;
    endDate?: Date;
    showTimer?: boolean;
    start?: boolean;
    onCancel?: () => void;
    onStart?: () => void;
    onTick?: (data: TimeDifference | null) => void;
  };
}) {
  const { duration, showTimer, endDate, format, onTick } = options;

  const [timer, setTimer] = useState<TimeDifference | null>(null);

  const handleTick = useCallback(
    (data: TimeDifference | null) => {
      onTick?.(data);
    },
    [onTick]
  );

  useEffect(() => {
    //
    if (!options.start) return;
    let interval: NodeJS.Timeout | null;

    const initEndDate = getEndDate({ endDate, duration, format });

    if (initEndDate) {
      //
      setTimeout(() => {
        const timeDifference = formatTimeDifference(initEndDate);
        if (timeDifference) {
          handleTick(timeDifference);
        }
      }, 1);

      interval = setInterval(() => {
        const timeDifference = formatTimeDifference(initEndDate);

        if (timeDifference) {
          handleTick(timeDifference);
        } else {
          interval && clearInterval(interval);
          handleTick(null);
        }
      }, 1000);
    }

    return () => {
      interval && clearInterval(interval);
    };
  }, [duration, options.start, format, endDate, handleTick]);

  return (
    <>
      {children} {showTimer && timer}
    </>
  );
}

export const getEndDate = ({
  endDate,
  duration,
  format,
}: {
  endDate?: Date;
  duration?: number;
  format?: FormatType;
}) => {
  if (!endDate) {
    let initEndDate = new Date(`${endDate}`);
    initEndDate = addDate(initEndDate, duration ?? 1, format ?? "seconds");

    return initEndDate;
  }

  return endDate;
};

export const addDate = (date: Date, duration: number, format: string) => {
  const initStartDate = new Date();
  const initDuration = duration;

  if (format == "hours") {
    date = new Date(
      initStartDate.setHours(initStartDate.getHours() + initDuration)
    );
    //
  } else if (format == "minutes") {
    date = new Date(
      initStartDate.setMinutes(initStartDate.getMinutes() + initDuration)
    );
    //
  } else {
    date = new Date(
      initStartDate.setSeconds(initStartDate.getSeconds() + initDuration)
    );
    //
  }
  return date;
};
