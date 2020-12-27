import moment from 'moment';

export const trimText = (text = "", limit) =>
    text.length > limit ? `${text.slice(0, limit)}...` : text;

export const formatDate = (date) => {
    return moment(date).format(`YYYY[년] MM[월] DD[일]`);
};

        