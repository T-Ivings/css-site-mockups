const searchInput = document.getElementById('color-search');
const resultsContainer = document.getElementById('results');
const colorDisplay = document.getElementById('color-display');

let timeoutId;

searchInput.addEventListener('keyup', () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    const query = searchInput.value;
    // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
    fetch(`YOUR_API_ENDPOINT?query=${query}`)
      .then(response => response.json())
      .then(data => {
        resultsContainer.innerHTML = '';
        data.colors.forEach(color => {
          const colorDiv = document.createElement('div');
          colorDiv.style.backgroundColor = color.hex;
          colorDiv.textContent = `${color.name} (${color.hex})`;
          colorDiv.addEventListener('click', () => {
            colorDisplay.style.backgroundColor = color.hex;
          });
          resultsContainer.appendChild(colorDiv);
        });
      })
      .catch(error => {
        console.error('Error fetching colors:', error);
        resultsContainer.innerHTML = 'An error occurred while searching.';
      });
  }, 1500);
});