async function search() {
    const input = document.getElementById('main-input').value.trim();

    if (!input) return;

    const resultsSection = document.getElementById('results-section');
    const resultsGrid = document.getElementById('results-grid');
    const resultsHeader = document.getElementById('results-header');

    resultsGrid.innerHTML = '<p class="no-results">Searching...</p>';
    resultsSection.style.display = 'block';
 
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`);
        const data = await response.json();

        if (data.meals) {
            resultsHeader.textContent = `${data.meals.length} recipe(s) found for "${input}"`;
            resultsGrid.innerHTML = data.meals.map(meal => `
                <div class="meal-card">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <div class="meal-card-body">
                        <div class="meal-card-title">${meal.strMeal}</div>
                        <div class="meal-card-meta">
                            <span class="meal-tag">${meal.strCategory}</span>
                            <span class="meal-tag">${meal.strArea}</span>
                        </div>
                    </div>
                </div>
            `).join('');
        } else {
            resultsHeader.textContent = `No results found for "${input}"`;
            resultsGrid.innerHTML = '<p class="no-results">Try a different meal name 🍽️</p>';
        }

    } catch (error) {
        resultsGrid.innerHTML = '<p class="no-results">Something went wrong. Please try again.</p>';
    }
}

