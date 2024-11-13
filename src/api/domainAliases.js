const data = new Map();
const idByAlias = new Map();

const parseCSV = (csvContent) => {
    const rows = csvContent.trim().split('\n');
    rows.forEach((row) => {
        const [id, alias] = row.split(',').map(item => item.trim());
        if (id && alias) {
            data.set(id, alias);
            idByAlias.set(alias, id);
        }
    });
};

export const getAliasesList = () => Array.from(data.values());
export const getAliasById = (id) => data.get(id) || null;
export const getIdByAlias = (alias) => idByAlias.get(alias) || null;

(async () => {
    try {
        const response = await fetch('./domains.csv');
        if (!response.ok) throw new Error('Failed to fetch the CSV file.');

        const csvContent = await response.text();
        parseCSV(csvContent);

        console.log(getAliasesList()); // Logs the list of aliases
    } catch (error) {
        console.error('Error:', error);
    }
})();
