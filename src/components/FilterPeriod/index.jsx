import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from "date-fns/locale/ru";
import format from "date-fns/format";
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import * as moment  from 'moment';

import { TbButton } from 'lab-cbdc2-tableau-styles';
import './styles.scss';
import 'bootstrap/dist/css/bootstrap.css'

class RuLocalizedUtils extends DateFnsUtils {
    getCalendarHeaderText(date) {
      return format(date, "LLLL yyyy", { locale: ruLocale });
    }
  }

export const FilterPeriod = ({title, format, labelFrom, labelTo, btnLabel, ...props}) => {
    const [valueFrom, setValueFrom] = useState(null);
    const [valueTo, setValueTo] = useState(null);

    return (
        <div className="filter-block">
        <div style={{ marginRight: '5px'}}>{title}:</div>
        <MuiPickersUtilsProvider utils={RuLocalizedUtils} locale={ruLocale}>
         <DatePicker
            id="filter-period-from"
            autoOk
            disableToolbar
            value={valueFrom}
            onChange={(e) => setValueFrom(moment(e).startOf('day').toString())}
            format={format}
            label={labelFrom}
            cancelLabel='Отмена'
        />
        
        <DatePicker
            id="filter-period-to"
            autoOk
            disableToolbar
            value={valueTo}
            onChange={(e) => setValueTo(moment(e).endOf('day').toString())}
            format={format}
            label={labelTo}
            cancelLabel='Отмена'
        />
        </MuiPickersUtilsProvider>
        <TbButton action={() => props.onSendPeriod(valueFrom, valueTo)}>{btnLabel}</TbButton>
        </div>
    )
}

FilterPeriod.defaultProps = {
  title: 'Выберите период',
  format: 'dd.MM.yyyy',
  labelFrom: 'с',
  labelTo: 'по',
  btnLabel: 'Отправить'
}
