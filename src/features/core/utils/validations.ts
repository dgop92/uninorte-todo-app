import * as dayjs from "dayjs";

export function validateDueDate(
  dueDate: dayjs.Dayjs | null
): dueDate is dayjs.Dayjs {
  if (!dueDate) {
    throw new Error("due date is required");
  }

  if (dueDate.isValid() === false) {
    throw new Error("due date is invalid");
  }

  if (dueDate.isBefore(dayjs().startOf("day"))) {
    throw new Error("due date cannot be in the past");
  }

  return true;
}
