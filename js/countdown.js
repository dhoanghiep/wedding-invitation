// Countdown Timer Functionality
(function() {
    'use strict';
    
    const weddingDate = new Date('2026-01-01T17:00:00').getTime();
    
    const monthsElement = document.getElementById('months');
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    const monthsItem = document.getElementById('countdown-months');
    const daysItem = document.getElementById('countdown-days');
    const hoursItem = document.getElementById('countdown-hours');
    const minutesItem = document.getElementById('countdown-minutes');
    const secondsItem = document.getElementById('countdown-seconds');
    
    function updateCountdown() {
        const now = new Date();
        const wedding = new Date(weddingDate);
        
        if (wedding < now) {
            // Wedding day has arrived or passed
            monthsElement.textContent = '00';
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
            // Hide all items
            [monthsItem, daysItem, hoursItem, minutesItem, secondsItem].forEach(item => {
                if (item) item.style.display = 'none';
            });
            return;
        }
        
        // Calculate months by incrementally adding months until we would exceed the wedding date
        let months = 0;
        const tempDate = new Date(now);
        
        // Add months one by one until adding one more would exceed the wedding date
        while (true) {
            const nextMonth = new Date(tempDate);
            nextMonth.setMonth(tempDate.getMonth() + 1);
            
            if (nextMonth > wedding) {
                break;
            }
            
            months++;
            tempDate.setMonth(tempDate.getMonth() + 1);
        }
        
        // Calculate remaining days after months
        const tempDateTimestamp = tempDate.getTime();
        const daysDiff = Math.floor((wedding - tempDateTimestamp) / (1000 * 60 * 60 * 24));
        
        // Calculate hours, minutes, and seconds from the remaining time
        const remainingTime = wedding - tempDateTimestamp - (daysDiff * 1000 * 60 * 60 * 24);
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        
        // Create array of values with their corresponding elements and items
        const countdownValues = [
            { value: months, element: monthsElement, item: monthsItem },
            { value: daysDiff, element: daysElement, item: daysItem },
            { value: hours, element: hoursElement, item: hoursItem },
            { value: minutes, element: minutesElement, item: minutesItem },
            { value: seconds, element: secondsElement, item: secondsItem }
        ];
        
        // Find first 3 non-zero values
        const nonZeroValues = countdownValues.filter(item => item.value > 0);
        const displayItems = nonZeroValues.slice(0, 3);
        
        // Update all values
        countdownValues.forEach(({ value, element }) => {
            if (element) {
                element.textContent = String(value).padStart(2, '0');
            }
        });
        
        // Show/hide items based on whether they should be displayed
        countdownValues.forEach(({ item, value }) => {
            if (item) {
                const shouldDisplay = displayItems.some(displayItem => displayItem.item === item);
                item.style.display = shouldDisplay ? '' : 'none';
            }
        });
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
})();

