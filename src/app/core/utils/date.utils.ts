export class DateUtils {
  public static convertIsoDate(isoDate: string): string {
    const date = new Date(isoDate);
    return `${date.getDate()} ${Months[date.getMonth()]} ${date.getFullYear()} года`;
  }
}

const Months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
