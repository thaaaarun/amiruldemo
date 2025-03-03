document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // Menu tabs functionality
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuContents = document.querySelectorAll('.menu-content');
    
    if (menuTabs.length && menuContents.length) {
        menuTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs and contents
                menuTabs.forEach(t => t.classList.remove('active'));
                menuContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (mobileMenuBtn) {
                    mobileMenuBtn.textContent = '☰';
                }
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Games functionality
    const gameCollection = document.getElementById('game-collection');
    const loadMoreBtn = document.getElementById('load-more-games');
    const gameSearch = document.getElementById('game-search');
    const categoryFilter = document.getElementById('category-filter');
    const difficultyFilter = document.getElementById('difficulty-filter');
    const familyFilter = document.getElementById('family-filter');
    const gameIcons = document.querySelectorAll('.game-icon');
    
    let allGames = [];
    let displayedGames = 0;
    const gamesPerLoad = 12;
    
    // Sample games data (instead of fetching from JSON)
    allGames = [
        {
            "GAME NAME": "5 Minute Dungeon",
            "GAME CATEGORY": "Cooperative",
            "NO. OF PLAYERS": "2-5",
            "DIFFICULTY": "Easy",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "7 Wonders",
            "GAME CATEGORY": "Strategy",
            "NO. OF PLAYERS": "2-7",
            "DIFFICULTY": "Medium",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Agricola Family Edition",
            "GAME CATEGORY": "Strategy",
            "NO. OF PLAYERS": "1-4",
            "DIFFICULTY": "Medium",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Agricola Revised Edition",
            "GAME CATEGORY": "Strategy",
            "NO. OF PLAYERS": "1-4",
            "DIFFICULTY": "Hard",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Arboretum",
            "GAME CATEGORY": "Competitive, Strategy",
            "NO. OF PLAYERS": "2-4",
            "DIFFICULTY": "Easy",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Azul",
            "GAME CATEGORY": "Strategy",
            "NO. OF PLAYERS": "2-4",
            "DIFFICULTY": "Medium",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Banangrams",
            "GAME CATEGORY": "Word game",
            "NO. OF PLAYERS": "1-8",
            "DIFFICULTY": "Easy",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Bang!",
            "GAME CATEGORY": "Deduction",
            "NO. OF PLAYERS": "4-7",
            "DIFFICULTY": "Easy",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Betrayal Of The House On The Hill",
            "GAME CATEGORY": "Deduction",
            "NO. OF PLAYERS": "3-6",
            "DIFFICULTY": "Medium",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Carcassonne",
            "GAME CATEGORY": "Family",
            "NO. OF PLAYERS": "2-5",
            "DIFFICULTY": "Medium",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Cards Against Humanity",
            "GAME CATEGORY": "Party",
            "NO. OF PLAYERS": "4-10",
            "DIFFICULTY": "Easy",
            "FAMILY FRIENDLY": "No"
        },
        {
            "GAME NAME": "Catan (5th Edition)",
            "GAME CATEGORY": "Trading, Competitive, Strategy",
            "NO. OF PLAYERS": "3-6",
            "DIFFICULTY": "Medium",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Chess And Checkers Set",
            "GAME CATEGORY": "Strategy",
            "NO. OF PLAYERS": "2",
            "DIFFICULTY": "Easy",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Citadels",
            "GAME CATEGORY": "Competitive, Deception",
            "NO. OF PLAYERS": "2-7",
            "DIFFICULTY": "Easy",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Codenames",
            "GAME CATEGORY": "Teams, Party",
            "NO. OF PLAYERS": "2-8",
            "DIFFICULTY": "Easy",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Coup",
            "GAME CATEGORY": "Deduction",
            "NO. OF PLAYERS": "2-6",
            "DIFFICULTY": "Easy",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Cranium",
            "GAME CATEGORY": "Party",
            "NO. OF PLAYERS": "4-12",
            "DIFFICULTY": "Easy",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Dixit",
            "GAME CATEGORY": "Party, Family",
            "NO. OF PLAYERS": "3-6",
            "DIFFICULTY": "Easy",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Exploding Kittens",
            "GAME CATEGORY": "Card, Party",
            "NO. OF PLAYERS": "2-5",
            "DIFFICULTY": "Easy",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Pandemic",
            "GAME CATEGORY": "Cooperative, Strategy",
            "NO. OF PLAYERS": "2-4",
            "DIFFICULTY": "Medium",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Scrabble",
            "GAME CATEGORY": "Word game",
            "NO. OF PLAYERS": "2-4",
            "DIFFICULTY": "Medium",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Ticket to Ride",
            "GAME CATEGORY": "Family, Strategy",
            "NO. OF PLAYERS": "2-5",
            "DIFFICULTY": "Easy",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Uno",
            "GAME CATEGORY": "Card, Family",
            "NO. OF PLAYERS": "2-10",
            "DIFFICULTY": "Easy",
            "FAMILY FRIENDLY": "Yes"
        },
        {
            "GAME NAME": "Wingspan",
            "GAME CATEGORY": "Strategy",
            "NO. OF PLAYERS": "1-5",
            "DIFFICULTY": "Medium",
            "FAMILY FRIENDLY": "Yes"
        }
    ];
    
    // Set up event listeners for search and filters
    if (gameSearch) {
        gameSearch.addEventListener('input', filterGames);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterGames);
    }
    
    if (difficultyFilter) {
        difficultyFilter.addEventListener('change', filterGames);
    }
    
    if (familyFilter) {
        familyFilter.addEventListener('change', filterGames);
    }
    
    // Game icons filter
    gameIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            if (categoryFilter) {
                categoryFilter.value = category;
                filterGames();
            }
        });
    });
    
    // Load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            displayGames(true);
        });
    }
    
    // Initial display of games
    displayGames();
    
    // Function to display games
    function displayGames(loadMore = false) {
        if (!gameCollection) return;
        
        if (!loadMore) {
            gameCollection.innerHTML = '';
            displayedGames = 0;
        }
        
        const filteredGames = getFilteredGames();
        const gamesToShow = filteredGames.slice(displayedGames, displayedGames + gamesPerLoad);
        
        if (gamesToShow.length === 0 && displayedGames === 0) {
            gameCollection.innerHTML = '<div class="no-results-message">No games found matching your criteria.</div>';
            if (loadMoreBtn) {
                loadMoreBtn.style.display = 'none';
            }
            return;
        }
        
        gamesToShow.forEach(game => {
            const gameCard = createGameCard(game);
            gameCollection.appendChild(gameCard);
        });
        
        displayedGames += gamesToShow.length;
        
        // Hide load more button if all games are displayed
        if (loadMoreBtn) {
            loadMoreBtn.style.display = displayedGames >= filteredGames.length ? 'none' : 'inline-block';
        }
    }
    
    // Function to create a game card
    function createGameCard(game) {
        const card = document.createElement('div');
        card.className = 'game-card';
        
        // Create placeholder image with emoji based on category
        const imageDiv = document.createElement('div');
        imageDiv.className = 'game-placeholder-image';
        
        // Choose emoji based on game category
        let emoji = '🎲'; // Default dice emoji
        if (game['GAME CATEGORY'].includes('Strategy')) emoji = '♟️';
        else if (game['GAME CATEGORY'].includes('Party')) emoji = '🎉';
        else if (game['GAME CATEGORY'].includes('Cooperative')) emoji = '🤝';
        else if (game['GAME CATEGORY'].includes('Family')) emoji = '👨‍👩‍👧‍👦';
        else if (game['GAME CATEGORY'].includes('Deduction')) emoji = '🔍';
        else if (game['GAME CATEGORY'].includes('Card')) emoji = '🃏';
        else if (game['GAME CATEGORY'].includes('Word')) emoji = '📝';
        else if (game['GAME CATEGORY'].includes('Puzzle')) emoji = '🧩';
        else if (game['GAME CATEGORY'].includes('Competitive')) emoji = '🏆';
        
        imageDiv.textContent = emoji;
        
        // Create content div
        const contentDiv = document.createElement('div');
        contentDiv.className = 'game-content';
        
        // Game title
        const title = document.createElement('h3');
        title.className = 'game-title';
        title.textContent = game['GAME NAME'];
        
        // Game category
        const category = document.createElement('p');
        category.className = 'game-category';
        category.textContent = game['GAME CATEGORY'];
        
        // Game difficulty
        const difficultyDiv = document.createElement('div');
        difficultyDiv.className = 'game-difficulty';
        
        const difficultyLevel = game['DIFFICULTY'];
        const dotCount = difficultyLevel === 'Easy' ? 1 : difficultyLevel === 'Medium' ? 2 : 3;
        
        for (let i = 0; i < 5; i++) {
            const dot = document.createElement('span');
            dot.className = 'difficulty-dot';
            if (i < dotCount) {
                dot.classList.add('active');
            }
            difficultyDiv.appendChild(dot);
        }
        
        // Player count
        const players = document.createElement('p');
        players.className = 'game-players';
        players.textContent = game['NO. OF PLAYERS'] + ' Players';
        
        // Family friendly tag
        const familyFriendly = document.createElement('div');
        familyFriendly.className = 'game-family-friendly';
        if (game['FAMILY FRIENDLY'] === 'Yes') {
            familyFriendly.textContent = '👪 Family Friendly';
        } else {
            familyFriendly.textContent = '🔞 Adult Game';
            familyFriendly.classList.add('no');
        }
        
        // Append all elements
        contentDiv.appendChild(title);
        contentDiv.appendChild(category);
        contentDiv.appendChild(difficultyDiv);
        contentDiv.appendChild(players);
        contentDiv.appendChild(familyFriendly);
        
        card.appendChild(imageDiv);
        card.appendChild(contentDiv);
        
        return card;
    }
    
    // Function to filter games based on search and filters
    function filterGames() {
        displayGames();
    }
    
    // Function to get filtered games
    function getFilteredGames() {
        if (!allGames.length) return [];
        
        let filtered = [...allGames];
        
        // Apply search filter
        if (gameSearch && gameSearch.value.trim() !== '') {
            const searchTerm = gameSearch.value.trim().toLowerCase();
            filtered = filtered.filter(game => 
                game['GAME NAME'].toLowerCase().includes(searchTerm) ||
                game['GAME CATEGORY'].toLowerCase().includes(searchTerm) ||
                game['NO. OF PLAYERS'].toLowerCase().includes(searchTerm)
            );
        }
        
        // Apply category filter
        if (categoryFilter && categoryFilter.value !== '') {
            const category = categoryFilter.value;
            filtered = filtered.filter(game => 
                game['GAME CATEGORY'].includes(category)
            );
        }
        
        // Apply difficulty filter
        if (difficultyFilter && difficultyFilter.value !== '') {
            const difficulty = difficultyFilter.value;
            filtered = filtered.filter(game => 
                game['DIFFICULTY'] === difficulty
            );
        }
        
        // Apply family friendly filter
        if (familyFilter && familyFilter.value !== '') {
            const family = familyFilter.value;
            filtered = filtered.filter(game => 
                game['FAMILY FRIENDLY'] === family
            );
        }
        
        return filtered;
    }
}); 