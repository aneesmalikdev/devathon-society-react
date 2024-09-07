import { FunctionComponent } from "react";
import type { BadgeProps, CalendarProps } from "antd";
import { Badge, Calendar } from "antd";
import type { Dayjs } from "dayjs";

const getListData = (
  value: Dayjs,
  events: { date: string; title: string }[]
) => {
  let listData: { type: string; content: string }[] = [];

  events.forEach((e) => {
    const eventDate = new Date(e.date);
    if (
      eventDate.getDate() === value.date() &&
      eventDate.getMonth() === value.month() &&
      eventDate.getFullYear() === value.year()
    )
      listData = [{ type: "success", content: e.title }];
  });

  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};
interface EventCalenderWidgetProps {
  events: { date: string; title: string }[];
}

const EventCalenderWidget: FunctionComponent<EventCalenderWidgetProps> = (
  props: EventCalenderWidgetProps
) => {
  const monthCellRender = (value: Dayjs) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value, props.events);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default EventCalenderWidget;
