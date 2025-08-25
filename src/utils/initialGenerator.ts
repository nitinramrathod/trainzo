function getInitials(fullName: string): string {
    return fullName
        .trim()
        .split(/\s+/) // Split by one or more spaces
        .map(word => word[0].toUpperCase())
        .join('');
}
export { getInitials };