import "components/DayListItem.scss";
import React from "react";
import classNames from "classnames";

const formatSpots = (spots) => {
  if (spots === 1) return "1 spot";
  if (spots > 0) return `${spots} spots`;
  return "no spots";
};

export default function DayListItem(props) {
  const textClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  });
  return (
    <li
      className={textClass}
      onClick={props.setDay}
      data-testid="day"
      data-cy="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
}
