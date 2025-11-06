// Countdown Timer Functionality
(function() {
    'use strict';
    
    // Set wedding date (June 15, 2025 at 4:00 PM)
    const weddingDate = new Date('2026-01-01T17:00:00').getTime();
    
    const monthsElement = document.getElementById('months');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    
    function updateCountdown() {
        const now = new Date();
        const wedding = new Date(weddingDate);
        
        if (wedding < now) {
            // Wedding day has arrived or passed
            monthsElement.textContent = '00';
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            return;
        }
        
        // Calculate months
        let months = wedding.getMonth() - now.getMonth();
        let years = wedding.getFullYear() - now.getFullYear();
        if (months < 0) {
            months += 12;
            years--;
        }
        months += years * 12;
        
        // Create a date that's exactly 'months' months from now
        const tempDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes());
        tempDate.setMonth(now.getMonth() + months);
        
        // If adding months pushed us past the wedding date, reduce by one month
        if (tempDate > wedding) {
            months--;
            tempDate.setMonth(now.getMonth() + months);
        }
        
        // Calculate remaining days after months
        const daysDiff = Math.floor((wedding - tempDate) / (1000 * 60 * 60 * 24));
        
        // Calculate hours and minutes from the remaining time
        const remainingTime = wedding - tempDate - (daysDiff * 1000 * 60 * 60 * 24);
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        
        // Update display with leading zeros
        monthsElement.textContent = String(months).padStart(2, '0');
        daysElement.textContent = String(daysDiff).padStart(2, '0');
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
    }
    
    // Update immediately and then every minute
    updateCountdown();
    setInterval(updateCountdown, 60000);
})();

