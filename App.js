import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  StatusBar,
} from 'react-native';

const CATEGORIES = [
  { id: 'My Food', label: '👨‍🍳 My Food' },
  { id: 'Favorites', label: '❤️ Favorites' },
  { id: 'Beef', label: '🥩 Beef' },
  { id: 'Chicken', label: '🍗 Chicken' },
  { id: 'Dessert', label: '🍰 Dessert' },
  { id: 'Pasta', label: '🍝 Pasta' },
  { id: 'Seafood', label: '🦐 Seafood' },
  { id: 'Vegan', label: '🥗 Vegan' },
  { id: 'Breakfast', label: '🥞 Breakfast' },
  { id: 'Soup', label: '🍲 Soup' },
  { id: 'Salad', label: '🥬 Salad' },
  { id: 'Drinks', label: '🍹 Drinks' },
];

const INITIAL_RECIPES = [
  {
    id: '1',
    name: 'Garlic Butter Steak',
    category: 'Beef',
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600',
    prepTime: '25 mins',
    servings: '2 servings',
    calories: '520 kcal',
    difficulty: 'Medium',
    ingredients: [
      '2 ribeye steaks',
      '3 tbsp unsalted butter',
      '4 cloves garlic, minced',
      '2 sprigs fresh rosemary',
      'Salt and black pepper',
    ],
    instructions: [
      'Pat steaks dry and season generously with salt and pepper.',
      'Heat a cast-iron skillet over high heat with a drizzle of oil.',
      'Sear steaks 3-4 minutes per side until golden brown.',
      'Add butter, garlic, and rosemary; baste steaks for 1 minute.',
      'Rest for 5 minutes before slicing and serving.',
    ],
  },
  {
    id: '2',
    name: 'Honey Garlic Chicken',
    category: 'Chicken',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=600',
    prepTime: '20 mins',
    servings: '3 servings',
    calories: '380 kcal',
    difficulty: 'Easy',
    ingredients: [
      '500g chicken breast, cubed',
      '3 tbsp honey',
      '2 tbsp soy sauce',
      '4 cloves garlic, minced',
      '1 tbsp olive oil',
    ],
    instructions: [
      'Season chicken with salt and pepper.',
      'Pan-sear chicken in olive oil until golden.',
      'Mix honey, soy sauce, and garlic in a small bowl.',
      'Pour sauce into the pan and simmer for 5 minutes until thickened.',
      'Garnish with sesame seeds and serve with rice.',
    ],
  },
  {
    id: '3',
    name: 'Strawberry Cheesecake',
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600',
    prepTime: '45 mins',
    servings: '6 servings',
    calories: '410 kcal',
    difficulty: 'Hard',
    ingredients: [
      '200g graham crackers',
      '400g cream cheese',
      '150g sugar',
      '200ml heavy cream',
      '250g fresh strawberries',
    ],
    instructions: [
      'Crush crackers with melted butter and press into a springform pan.',
      'Beat cream cheese and sugar until smooth.',
      'Fold in whipped heavy cream and pour over the crust.',
      'Chill in the refrigerator for at least 4 hours.',
      'Top with sliced fresh strawberries before serving.',
    ],
  },
  {
    id: '4',
    name: 'Creamy Carbonara',
    category: 'Pasta',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=600',
    prepTime: '20 mins',
    servings: '2 servings',
    calories: '490 kcal',
    difficulty: 'Medium',
    ingredients: [
      '250g spaghetti',
      '100g pancetta or bacon',
      '2 large eggs',
      '50g grated Parmesan cheese',
      'Freshly cracked black pepper',
    ],
    instructions: [
      'Boil spaghetti in salted water until al dente.',
      'Fry pancetta in a pan until crispy.',
      'Whisk eggs, Parmesan, and black pepper in a bowl.',
      'Toss hot pasta with pancetta off the heat, then stir in egg mixture.',
      'Add a splash of pasta water until silky and serve immediately.',
    ],
  },
  {
    id: '5',
    name: 'Lemon Butter Shrimp',
    category: 'Seafood',
    image: 'https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=600',
    prepTime: '15 mins',
    servings: '2 servings',
    calories: '310 kcal',
    difficulty: 'Easy',
    ingredients: [
      '400g large shrimp, peeled',
      '3 tbsp butter',
      '3 cloves garlic, minced',
      '1 fresh lemon (juiced)',
      'Fresh parsley, chopped',
    ],
    instructions: [
      'Melt butter in a skillet over medium heat.',
      'Saute garlic for 30 seconds until fragrant.',
      'Add shrimp and cook 2 minutes per side until pink.',
      'Squeeze fresh lemon juice over the shrimp and toss.',
      'Sprinkle with chopped parsley and serve hot.',
    ],
  },
  {
    id: '6',
    name: 'Avocado Buddha Bowl',
    category: 'Vegan',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600',
    prepTime: '20 mins',
    servings: '2 servings',
    calories: '360 kcal',
    difficulty: 'Easy',
    ingredients: [
      '1 cup cooked quinoa',
      '1 ripe avocado, sliced',
      '1 cup roasted chickpeas',
      '1 cup cherry tomatoes',
      '2 tbsp tahini dressing',
    ],
    instructions: [
      'Divide warm cooked quinoa into two bowls.',
      'Arrange sliced avocado, chickpeas, and cherry tomatoes on top.',
      'Drizzle generously with tahini dressing.',
      'Season with a pinch of sea salt and serve.',
    ],
  },
  {
    id: '7',
    name: 'Fluffy Berry Pancakes',
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600',
    prepTime: '15 mins',
    servings: '3 servings',
    calories: '340 kcal',
    difficulty: 'Easy',
    ingredients: [
      '1.5 cups all-purpose flour',
      '1 cup milk',
      '1 egg',
      '2 tbsp maple syrup',
      '1/2 cup mixed berries',
    ],
    instructions: [
      'Whisk flour, milk, egg, and baking powder into a smooth batter.',
      'Pour ladlefuls onto a lightly greased skillet.',
      'Cook until bubbles form on top, then flip for 1-2 minutes.',
      'Stack pancakes, top with berries, and drizzle maple syrup.',
    ],
  },
  {
    id: '8',
    name: 'Creamy Tomato Soup',
    category: 'Soup',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600',
    prepTime: '30 mins',
    servings: '4 servings',
    calories: '240 kcal',
    difficulty: 'Easy',
    ingredients: [
      '800g ripe tomatoes',
      '1 onion, chopped',
      '3 cloves garlic',
      '2 cups vegetable broth',
      '1/2 cup heavy cream',
    ],
    instructions: [
      'Saute chopped onion and garlic in olive oil until soft.',
      'Add tomatoes and vegetable broth; simmer for 20 minutes.',
      'Blend the soup until completely smooth.',
      'Stir in heavy cream, season with salt, and garnish with basil.',
    ],
  },
  {
    id: '9',
    name: 'Classic Caesar Salad',
    category: 'Salad',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600',
    prepTime: '10 mins',
    servings: '2 servings',
    calories: '280 kcal',
    difficulty: 'Easy',
    ingredients: [
      '1 head romaine lettuce',
      '1 cup garlic croutons',
      '40g shaved Parmesan',
      '3 tbsp Caesar dressing',
      'Black pepper',
    ],
    instructions: [
      'Wash, dry, and chop romaine lettuce into bite-sized pieces.',
      'Toss lettuce in a large bowl with Caesar dressing.',
      'Top with crunchy croutons and shaved Parmesan.',
      'Finish with cracked black pepper and serve chilled.',
    ],
  },
  {
    id: '10',
    name: 'Iced Matcha Latte',
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=600',
    prepTime: '5 mins',
    servings: '1 serving',
    calories: '150 kcal',
    difficulty: 'Easy',
    ingredients: [
      '2 tsp matcha powder',
      '60ml hot water',
      '200ml cold milk',
      '1 tbsp honey or syrup',
      'Ice cubes',
    ],
    instructions: [
      'Whisk matcha powder with hot water until frothy and lump-free.',
      'Fill a glass with ice cubes and pour in cold milk.',
      'Stir in honey or syrup to taste.',
      'Slowly pour the whisked matcha over the milk and enjoy.',
    ],
  },
];

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('Beef');
  const [favorites, setFavorites] = useState([]);
  const [myRecipes, setMyRecipes] = useState([
    {
      id: 'my-1',
      name: 'Homemade Crispy Chicken',
      category: 'My Food',
      image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=600',
      prepTime: '25 mins',
      servings: '2 servings',
      calories: '420 kcal',
      difficulty: 'Easy',
      ingredients: ['300g chicken breast', '1 egg', 'Breadcrumbs', 'Garlic powder'],
      instructions: [
        'Cut chicken into bite-sized pieces and season.',
        'Dip in beaten egg and coat with breadcrumbs.',
        'Fry until golden and crispy.',
      ],
    },
  ]);

  // Navigation state: 'Home' | 'Detail' | 'Form'
  const [currentScreen, setCurrentScreen] = useState('Home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [editingRecipeId, setEditingRecipeId] = useState(null);

  // Form states
  const [recipeName, setRecipeName] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [recipeIngredients, setRecipeIngredients] = useState('');
  const [recipeInstructions, setRecipeInstructions] = useState('');
  const [recipePrepTime, setRecipePrepTime] = useState('20 mins');
  const [recipeServings, setRecipeServings] = useState('2 servings');
  const [recipeCalories, setRecipeCalories] = useState('350 kcal');
  const [recipeDifficulty, setRecipeDifficulty] = useState('Easy');
  const [formError, setFormError] = useState('');

  const allRecipes = [...INITIAL_RECIPES, ...myRecipes];

  const toggleFavorite = (recipeId) => {
    setFavorites((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const openRecipeDetail = (recipe) => {
    setSelectedRecipe(recipe);
    setCurrentScreen('Detail');
  };

  const openAddForm = () => {
    setEditingRecipeId(null);
    setRecipeName('');
    setRecipeImage('');
    setRecipeIngredients('');
    setRecipeInstructions('');
    setRecipePrepTime('20 mins');
    setRecipeServings('2 servings');
    setRecipeCalories('350 kcal');
    setRecipeDifficulty('Easy');
    setFormError('');
    setCurrentScreen('Form');
  };

  const openEditForm = (recipe) => {
    setEditingRecipeId(recipe.id);
    setRecipeName(recipe.name);
    setRecipeImage(recipe.image);
    setRecipeIngredients(recipe.ingredients.join('\n'));
    setRecipeInstructions(recipe.instructions.join('\n'));
    setRecipePrepTime(recipe.prepTime || '20 mins');
    setRecipeServings(recipe.servings || '2 servings');
    setRecipeCalories(recipe.calories || '350 kcal');
    setRecipeDifficulty(recipe.difficulty || 'Easy');
    setFormError('');
    setCurrentScreen('Form');
  };

  const handleSaveRecipe = () => {
    if (!recipeName.trim() || !recipeIngredients.trim() || !recipeInstructions.trim()) {
      setFormError('Please fill in Recipe Name, Ingredients, and Instructions.');
      return;
    }

    const newRecipeData = {
      id: editingRecipeId ? editingRecipeId : `my-${Date.now()}`,
      name: recipeName.trim(),
      category: 'My Food',
      image: recipeImage.trim() || DEFAULT_IMAGE,
      prepTime: recipePrepTime.trim() || '20 mins',
      servings: recipeServings.trim() || '2 servings',
      calories: recipeCalories.trim() || '350 kcal',
      difficulty: recipeDifficulty.trim() || 'Easy',
      ingredients: recipeIngredients
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      instructions: recipeInstructions
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
    };

    if (editingRecipeId) {
      setMyRecipes((prev) =>
        prev.map((item) => (item.id === editingRecipeId ? newRecipeData : item))
      );
    } else {
      setMyRecipes((prev) => [newRecipeData, ...prev]);
    }

    setSelectedCategory('My Food');
    setCurrentScreen('Home');
  };

  const handleDeleteRecipe = (recipeId) => {
    setMyRecipes((prev) => prev.filter((item) => item.id !== recipeId));
    setFavorites((prev) => prev.filter((id) => id !== recipeId));
  };

  // --- SCREEN 1: RECIPE DETAIL ---
  if (currentScreen === 'Detail' && selectedRecipe) {
    const isFav = favorites.includes(selectedRecipe.id);
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentScreen('Home')}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.heartButton}
            onPress={() => toggleFavorite(selectedRecipe.id)}
          >
            <Text style={styles.heartIcon}>{isFav ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.detailContent}>
          <Image source={{ uri: selectedRecipe.image }} style={styles.detailImage} />
          <Text style={styles.detailTitle}>{selectedRecipe.name}</Text>
          <Text style={styles.detailCategory}>{selectedRecipe.category}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>⏱ Prep Time</Text>
              <Text style={styles.statValue}>{selectedRecipe.prepTime}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>🍽 Servings</Text>
              <Text style={styles.statValue}>{selectedRecipe.servings}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>🔥 Calories</Text>
              <Text style={styles.statValue}>{selectedRecipe.calories}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>📊 Difficulty</Text>
              <Text style={styles.statValue}>{selectedRecipe.difficulty}</Text>
            </View>
          </View>

          <Text style={styles.sectionHeading}>Ingredients</Text>
          {selectedRecipe.ingredients.map((item, idx) => (
            <Text key={idx} style={styles.listItem}>
              • {item}
            </Text>
          ))}

          <Text style={styles.sectionHeading}>Instructions</Text>
          {selectedRecipe.instructions.map((step, idx) => (
            <Text key={idx} style={styles.listItem}>
              {idx + 1}. {step}
            </Text>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // --- SCREEN 2: ADD / EDIT RECIPE FORM ---
  if (currentScreen === 'Form') {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setCurrentScreen('Home')}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {editingRecipeId ? 'Edit Recipe' : 'Add New Recipe'}
          </Text>
          <View style={{ width: 60 }} />
        </View>

        <ScrollView contentContainerStyle={styles.formContainer}>
          {formError ? <Text style={styles.errorText}>{formError}</Text> : null}

          <Text style={styles.label}>Recipe Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Spicy Noodle Soup"
            value={recipeName}
            onChangeText={setRecipeName}
          />

          <Text style={styles.label}>Image URL (Upload / Paste Link)</Text>
          <TextInput
            style={styles.input}
            placeholder="https://example.com/food.jpg (optional)"
            value={recipeImage}
            onChangeText={setRecipeImage}
          />
          <TouchableOpacity
            style={styles.sampleImgBtn}
            onPress={() => setRecipeImage(DEFAULT_IMAGE)}
          >
            <Text style={styles.sampleImgText}>📷 Use Sample Food Image</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Ingredients List (one per line) *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder={'200g noodles\n2 eggs\n1 tbsp soy sauce'}
            value={recipeIngredients}
            onChangeText={setRecipeIngredients}
            multiline
          />

          <Text style={styles.label}>Step-by-step Instructions (one per line) *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder={'Boil water.\nCook noodles for 4 minutes.\nServe hot.'}
            value={recipeInstructions}
            onChangeText={setRecipeInstructions}
            multiline
          />

          <View style={styles.rowInputs}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.label}>Prep Time</Text>
              <TextInput
                style={styles.input}
                value={recipePrepTime}
                onChangeText={setRecipePrepTime}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Servings</Text>
              <TextInput
                style={styles.input}
                value={recipeServings}
                onChangeText={setRecipeServings}
              />
            </View>
          </View>

          <View style={styles.rowInputs}>
            <View style={{ flex: 1, marginRight: 8 }}>
              <Text style={styles.label}>Calories</Text>
              <TextInput
                style={styles.input}
                value={recipeCalories}
                onChangeText={setRecipeCalories}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Difficulty</Text>
              <TextInput
                style={styles.input}
                value={recipeDifficulty}
                onChangeText={setRecipeDifficulty}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveRecipe}>
            <Text style={styles.saveButtonText}>Save Recipe</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // --- SCREEN 3: MAIN FEED ---
  let displayedRecipes = [];
  if (selectedCategory === 'Favorites') {
    displayedRecipes = allRecipes.filter((r) => favorites.includes(r.id));
  } else if (selectedCategory === 'My Food') {
    displayedRecipes = myRecipes;
  } else {
    displayedRecipes = INITIAL_RECIPES.filter((r) => r.category === selectedCategory);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.appTitle}>🍽️ Foodie</Text>
        <Text style={styles.appSubtitle}>Discover, cook, and save your favorite meals</Text>
      </View>

      {/* Horizontal Categories Bar (10+ Categories + My Food + Favorites) */}
      <View style={styles.categoryWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[styles.categoryChip, isActive && styles.categoryChipActive]}
                onPress={() => setSelectedCategory(cat.id)}
              >
                <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* My Food Section Header + Add New Recipe Button */}
      {selectedCategory === 'My Food' && (
        <View style={styles.myFoodHeader}>
          <Text style={styles.sectionTitle}>My Recipes ({myRecipes.length})</Text>
          <TouchableOpacity style={styles.addButton} onPress={openAddForm}>
            <Text style={styles.addButtonText}>+ Add New Recipe</Text>
          </TouchableOpacity>
        </View>
      )}

      {selectedCategory !== 'My Food' && (
        <Text style={styles.feedHeading}>
          {selectedCategory === 'Favorites' ? 'Favorite Recipes' : `${selectedCategory} Recipes`}
        </Text>
      )}

      <FlatList
        data={displayedRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {selectedCategory === 'Favorites'
              ? 'No favorites yet. Tap the ❤️ icon on any recipe to save it here!'
              : 'No recipes found. Tap "+ Add New Recipe" to create one!'}
          </Text>
        }
        renderItem={({ item }) => {
          const isFav = favorites.includes(item.id);
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => openRecipeDetail(item)}
              activeOpacity={0.85}
            >
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <View style={styles.cardBody}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
                    <Text style={styles.heartIcon}>{isFav ? '❤️' : '🤍'}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.cardMeta}>
                  ⏱ {item.prepTime}  •  🔥 {item.calories}  •  📊 {item.difficulty}
                </Text>

                {selectedCategory === 'My Food' && (
                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={styles.editBtn}
                      onPress={() => openEditForm(item)}
                    >
                      <Text style={styles.editBtnText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteBtn}
                      onPress={() => handleDeleteRecipe(item.id)}
                    >
                      <Text style={styles.deleteBtnText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF9FA' },
  header: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 8 },
  appTitle: { fontSize: 28, fontWeight: '800', color: '#E91E63' },
  appSubtitle: { fontSize: 13, color: '#666', marginTop: 2 },
  categoryWrapper: { paddingVertical: 10, paddingLeft: 16 },
  categoryChip: {
    backgroundColor: '#F3E5EC',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipActive: { backgroundColor: '#E91E63' },
  categoryText: { fontSize: 14, fontWeight: '600', color: '#444' },
  categoryTextActive: { color: '#FFF' },
  feedHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  myFoodHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#222' },
  addButton: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addButtonText: { color: '#FFF', fontWeight: '700', fontSize: 13 },
  listContent: { paddingHorizontal: 16, paddingBottom: 30 },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 40, fontSize: 15 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 14,
    marginBottom: 14,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  cardImage: { width: '100%', height: 170, backgroundColor: '#EEE' },
  cardBody: { padding: 12 },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: { fontSize: 17, fontWeight: '700', color: '#222', flex: 1 },
  heartIcon: { fontSize: 22, marginLeft: 8 },
  cardMeta: { fontSize: 13, color: '#666', marginTop: 6 },
  actionRow: { flexDirection: 'row', marginTop: 12, gap: 10 },
  editBtn: {
    backgroundColor: '#FCE4EC',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 8,
  },
  editBtnText: { color: '#C2185B', fontWeight: '700' },
  deleteBtn: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 8,
  },
  deleteBtnText: { color: '#D32F2F', fontWeight: '700' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E0E6',
    backgroundColor: '#FFF',
  },
  backButton: {
    backgroundColor: '#FCE4EC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  backButtonText: { color: '#C2185B', fontWeight: '700', fontSize: 15 },
  heartButton: { padding: 4 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#222' },
  detailContent: { padding: 16, paddingBottom: 40 },
  detailImage: { width: '100%', height: 220, borderRadius: 14, marginBottom: 14 },
  detailTitle: { fontSize: 24, fontWeight: '800', color: '#222' },
  detailCategory: { fontSize: 14, color: '#E91E63', fontWeight: '600', marginBottom: 14 },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statBox: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F3E5EC',
  },
  statLabel: { fontSize: 12, color: '#777' },
  statValue: { fontSize: 15, fontWeight: '700', color: '#222', marginTop: 2 },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginTop: 12,
    marginBottom: 8,
  },
  listItem: { fontSize: 15, color: '#444', lineHeight: 22, marginBottom: 4 },
  formContainer: { padding: 16, paddingBottom: 40 },
  label: { fontSize: 14, fontWeight: '700', color: '#333', marginBottom: 6, marginTop: 10 },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0C8D0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  textArea: { height: 90, textAlignVertical: 'top' },
  rowInputs: { flexDirection: 'row', marginTop: 4 },
  sampleImgBtn: {
    marginTop: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#FCE4EC',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  sampleImgText: { color: '#C2185B', fontSize: 12, fontWeight: '600' },
  errorText: { color: '#D32F2F', fontWeight: '600', marginBottom: 8 },
  saveButton: {
    backgroundColor: '#E91E63',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
});
