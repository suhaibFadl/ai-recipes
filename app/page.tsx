'use client'

import { useState } from 'react'
import MobileFrame from '@/components/MobileFrame'
import PhoneNumberPage from '@/components/PhoneNumberPage'
import OTPPage from '@/components/OTPPage'
import HomePage from '@/components/HomePage'
import RecipesPage from '@/components/RecipesPage'
import RecipeByNamePage from '@/components/RecipeByNamePage'
import RecipesByIngredientsPage from '@/components/RecipesByIngredientsPage'
import ImageToDescriptionPage from '@/components/ImageToDescriptionPage'
import MealSchedulePage from '@/components/MealSchedulePage'
import SettingsPage from '@/components/SettingsPage'
import RecipeDetailsPage from '@/components/RecipeDetailsPage'
import DayMealsPage from '@/components/DayMealsPage'
import MyRecipesPage from '@/components/MyRecipesPage'
import CreateRecipePage from '@/components/CreateRecipePage'

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'phone' | 'otp' | 'home' | 'recipes' | 'recipe-by-name' | 'recipes-by-ingredients' | 'image-to-description' | 'meal-schedule' | 'settings' | 'recipe-details' | 'day-meals' | 'my-recipes' | 'create-recipe'>('phone')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedRecipeId, setSelectedRecipeId] = useState('')
  const [previousPage, setPreviousPage] = useState<'recipe-by-name' | 'recipes-by-ingredients' | 'day-meals' | 'my-recipes'>('recipe-by-name')
  const [selectedDayData, setSelectedDayData] = useState<{ dayName: string, meals: any[] } | null>(null)

  const handlePhoneSubmit = (phone: string) => {
    setPhoneNumber(phone)
    setCurrentPage('otp')
  }

  const handleOTPVerify = () => {
    setCurrentPage('home')
  }

  const navigateToPage = (page: typeof currentPage) => {
    setCurrentPage(page)
  }

  const handleNavChange = (value: string) => {
    if (value === 'home') {
      setCurrentPage('home')
    } else if (value === 'recipes') {
      setCurrentPage('recipes')
    } else if (value === 'image-to-description') {
      setCurrentPage('image-to-description')
    } else if (value === 'meal-schedule') {
      setCurrentPage('meal-schedule')
    } else if (value === 'settings') {
      setCurrentPage('settings')
    }
  }

  const getCurrentNav = () => {
    if (currentPage === 'home') return 'home'
    if (currentPage === 'recipes' || currentPage === 'recipe-by-name' || currentPage === 'recipes-by-ingredients' || currentPage === 'recipe-details' || currentPage === 'my-recipes' || currentPage === 'create-recipe') return 'recipes'
    if (currentPage === 'image-to-description') return 'image-to-description'
    if (currentPage === 'meal-schedule' || currentPage === 'day-meals') return 'meal-schedule'
    if (currentPage === 'settings') return 'settings'
    return 'home'
  }

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      padding: '20px'
    }}>
      <MobileFrame>
        {currentPage === 'phone' && (
          <PhoneNumberPage onPhoneSubmit={handlePhoneSubmit} />
        )}
        {currentPage === 'otp' && (
          <OTPPage phoneNumber={phoneNumber} onVerify={handleOTPVerify} />
        )}
        {currentPage === 'home' && (
          <HomePage 
            onNavigate={(page, dayData) => {
              if (page === 'day-meals' && dayData) {
                setSelectedDayData(dayData)
                setCurrentPage('day-meals')
              } else {
                navigateToPage(page)
              }
            }}
            currentNav={getCurrentNav()}
            onNavChange={handleNavChange}
          />
        )}
        {currentPage === 'recipes' && (
          <RecipesPage 
            onNavigate={(page) => {
              if (page === 'create-recipe') {
                setCurrentPage('create-recipe')
              } else {
                navigateToPage(page)
              }
            }}
            onBack={() => navigateToPage('home')} 
            currentNav={getCurrentNav()}
            onNavChange={handleNavChange}
          />
        )}
        {currentPage === 'my-recipes' && (
          <MyRecipesPage 
            onBack={() => navigateToPage('recipes')}
            onNavigate={(page, recipeId) => {
              if (page === 'recipe-details' && recipeId) {
                setSelectedRecipeId(recipeId)
                setPreviousPage('my-recipes' as any)
                setCurrentPage('recipe-details')
              } else if (page === 'create-recipe') {
                setCurrentPage('create-recipe')
              }
            }}
            currentNav={getCurrentNav()}
            onNavChange={handleNavChange}
          />
        )}
        {currentPage === 'create-recipe' && (
          <CreateRecipePage 
            onBack={() => navigateToPage('my-recipes')}
            currentNav={getCurrentNav()}
            onNavChange={handleNavChange}
          />
        )}
        {currentPage === 'recipe-by-name' && (
          <RecipeByNamePage 
            onBack={() => navigateToPage('recipes')} 
            onNavigate={(page, recipeId) => {
              setSelectedRecipeId(recipeId)
              setPreviousPage('recipe-by-name')
              setCurrentPage('recipe-details')
            }}
            currentNav={getCurrentNav()}
            onNavChange={handleNavChange}
          />
        )}
        {currentPage === 'recipe-details' && (
          <RecipeDetailsPage 
            recipeId={selectedRecipeId}
            onBack={() => navigateToPage(previousPage)} 
            currentNav={getCurrentNav()}
            onNavChange={handleNavChange}
          />
        )}
        {currentPage === 'recipes-by-ingredients' && (
          <RecipesByIngredientsPage 
            onBack={() => navigateToPage('recipes')} 
            onNavigate={(page, recipeId) => {
              setSelectedRecipeId(recipeId)
              setPreviousPage('recipes-by-ingredients')
              setCurrentPage('recipe-details')
            }}
            currentNav={getCurrentNav()}
            onNavChange={handleNavChange}
          />
        )}
        {currentPage === 'image-to-description' && (
          <ImageToDescriptionPage 
            onBack={() => navigateToPage('home')} 
            currentNav={getCurrentNav()}
            onNavChange={handleNavChange}
          />
        )}
        {currentPage === 'meal-schedule' && (
          <MealSchedulePage 
            onBack={() => navigateToPage('home')} 
            onNavigate={(dayDate, dayName, meals) => {
              setSelectedDayData({ dayName, meals })
              setCurrentPage('day-meals')
            }}
            currentNav={getCurrentNav()}
            onNavChange={handleNavChange}
          />
        )}
        {currentPage === 'day-meals' && selectedDayData && (
          <DayMealsPage 
            dayName={selectedDayData.dayName}
            meals={selectedDayData.meals}
            onBack={() => navigateToPage('meal-schedule')}
            onNavigate={(page, recipeId) => {
              setSelectedRecipeId(recipeId)
              setPreviousPage('day-meals' as any)
              setCurrentPage('recipe-details')
            }}
            currentNav={getCurrentNav()}
            onNavChange={handleNavChange}
          />
        )}
        {currentPage === 'settings' && (
          <SettingsPage 
            onBack={() => navigateToPage('home')} 
            currentNav={getCurrentNav()}
            onNavChange={handleNavChange}
          />
        )}
      </MobileFrame>
    </div>
  )
}
