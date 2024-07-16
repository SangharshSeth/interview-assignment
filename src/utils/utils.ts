export const calculateAgeFromBirthday = (birthDay: string) => {
    //Birthday in format YYYY-MM-DD
    //e.g - 1996-07-07
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    
}