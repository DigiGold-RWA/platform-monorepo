export function formatDate(inputDateString, type) {
    const date = new Date(inputDateString);

    switch (type) {
        case 1:
            return date.toISOString().split("T")[0];
        case 2:
            const options = { month: "short", day: "numeric", year: "numeric" };
            return date.toLocaleDateString("en-US", options);
        default:
            return formatDateForDisplay(date);
    }
}
