import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Plus, Edit, Trash2, Save, X, FileText, Globe, TestTube, Settings, Download, Upload, Eye, EyeOff } from 'lucide-react'
import './App.css'

function App() {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [isEditingCategory, setIsEditingCategory] = useState(false)
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [showAdminDialog, setShowAdminDialog] = useState(false)
  const [newCategory, setNewCategory] = useState({
    id: '',
    name: '',
    description: '',
    criteria: {
      lab_analyses: { mandatory: [], optional: [] },
      blocked_countries: [],
      label_requirements: []
    }
  })

  // Load categories from JSON file
  useEffect(() => {
    fetch('/categories.json')
      .then(response => response.json())
      .then(data => {
        setCategories(data)
        if (data.length > 0) {
          setSelectedCategory(data[0])
        }
      })
      .catch(error => console.error('Error loading categories:', error))
  }, [])

  const handleAdminLogin = () => {
    // Simple password check - in production, this should be more secure
    if (adminPassword === 'admin123') {
      setIsAdminMode(true)
      setShowAdminDialog(false)
      setAdminPassword('')
    } else {
      alert('Invalid password')
    }
  }

  const handleAdminLogout = () => {
    setIsAdminMode(false)
    setIsEditingCategory(false)
  }

  const handleAddCategory = () => {
    const categoryWithId = {
      ...newCategory,
      id: `CAT-${String(categories.length + 1).padStart(3, '0')}`
    }
    setCategories([...categories, categoryWithId])
    setSelectedCategory(categoryWithId)
    setIsAddingCategory(false)
    resetNewCategory()
  }

  const handleEditCategory = () => {
    const updatedCategories = categories.map(cat => 
      cat.id === selectedCategory.id ? selectedCategory : cat
    )
    setCategories(updatedCategories)
    setIsEditingCategory(false)
  }

  const handleDeleteCategory = (categoryId) => {
    const updatedCategories = categories.filter(cat => cat.id !== categoryId)
    setCategories(updatedCategories)
    if (selectedCategory?.id === categoryId) {
      setSelectedCategory(updatedCategories.length > 0 ? updatedCategories[0] : null)
    }
  }

  const resetNewCategory = () => {
    setNewCategory({
      id: '',
      name: '',
      description: '',
      criteria: {
        lab_analyses: { mandatory: [], optional: [] },
        blocked_countries: [],
        label_requirements: []
      }
    })
  }

  const addLabAnalysis = (type, analysis) => {
    if (isEditingCategory) {
      setSelectedCategory(prev => ({
        ...prev,
        criteria: {
          ...prev.criteria,
          lab_analyses: {
            ...prev.criteria.lab_analyses,
            [type]: [...prev.criteria.lab_analyses[type], analysis]
          }
        }
      }))
    } else {
      setNewCategory(prev => ({
        ...prev,
        criteria: {
          ...prev.criteria,
          lab_analyses: {
            ...prev.criteria.lab_analyses,
            [type]: [...prev.criteria.lab_analyses[type], analysis]
          }
        }
      }))
    }
  }

  const addBlockedCountry = (country) => {
    if (isEditingCategory) {
      setSelectedCategory(prev => ({
        ...prev,
        criteria: {
          ...prev.criteria,
          blocked_countries: [...prev.criteria.blocked_countries, country]
        }
      }))
    } else {
      setNewCategory(prev => ({
        ...prev,
        criteria: {
          ...prev.criteria,
          blocked_countries: [...prev.criteria.blocked_countries, country]
        }
      }))
    }
  }

  const addLabelRequirement = (requirement) => {
    if (isEditingCategory) {
      setSelectedCategory(prev => ({
        ...prev,
        criteria: {
          ...prev.criteria,
          label_requirements: [...prev.criteria.label_requirements, requirement]
        }
      }))
    } else {
      setNewCategory(prev => ({
        ...prev,
        criteria: {
          ...prev.criteria,
          label_requirements: [...prev.criteria.label_requirements, requirement]
        }
      }))
    }
  }

  const removeItem = (type, index) => {
    if (isEditingCategory) {
      setSelectedCategory(prev => {
        const newCriteria = { ...prev.criteria }
        if (type === 'mandatory' || type === 'optional') {
          newCriteria.lab_analyses[type].splice(index, 1)
        } else {
          newCriteria[type].splice(index, 1)
        }
        return { ...prev, criteria: newCriteria }
      })
    } else {
      setNewCategory(prev => {
        const newCriteria = { ...prev.criteria }
        if (type === 'mandatory' || type === 'optional') {
          newCriteria.lab_analyses[type].splice(index, 1)
        } else {
          newCriteria[type].splice(index, 1)
        }
        return { ...prev, criteria: newCriteria }
      })
    }
  }

  const exportData = () => {
    const dataStr = JSON.stringify(categories, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    const exportFileDefaultName = 'categories.json'
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const importData = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result)
          setCategories(importedData)
          if (importedData.length > 0) {
            setSelectedCategory(importedData[0])
          }
          alert('Data imported successfully!')
        } catch (error) {
          alert('Error importing data: Invalid JSON format')
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Category Criteria Manager</h1>
              <p className="text-lg text-gray-600">Manage import/export criteria for different product categories</p>
            </div>
            <div className="flex items-center gap-2">
              {isAdminMode ? (
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <Settings className="h-3 w-3" />
                    Admin Mode
                  </Badge>
                  <Button variant="outline" size="sm" onClick={exportData}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => document.getElementById('import-file').click()}>
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                  <input
                    id="import-file"
                    type="file"
                    accept=".json"
                    onChange={importData}
                    style={{ display: 'none' }}
                  />
                  <Button variant="outline" size="sm" onClick={handleAdminLogout}>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Exit Admin
                  </Button>
                </div>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setShowAdminDialog(true)}>
                  <Eye className="h-4 w-4 mr-2" />
                  Admin Mode
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Admin Login Dialog */}
        <Dialog open={showAdminDialog} onOpenChange={setShowAdminDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Admin Access</DialogTitle>
              <DialogDescription>
                Enter the admin password to access administrative features.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="col-span-3"
                  onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAdminLogin}>Login</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Categories</CardTitle>
                {isAdminMode && (
                  <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
                    <DialogTrigger asChild>
                      <Button size="sm" onClick={() => setIsAddingCategory(true)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add New Category</DialogTitle>
                        <DialogDescription>
                          Create a new product category with its associated criteria.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">Name</Label>
                          <Input
                            id="name"
                            value={newCategory.name}
                            onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="description" className="text-right">Description</Label>
                          <Textarea
                            id="description"
                            value={newCategory.description}
                            onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleAddCategory}>Add Category</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedCategory?.id === category.id
                          ? 'bg-blue-100 border-2 border-blue-300'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-sm">{category.name}</h3>
                          <p className="text-xs text-gray-500">{category.id}</p>
                        </div>
                        {isAdminMode && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteCategory(category.id)
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {selectedCategory ? (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <div>
                    <CardTitle className="text-xl">{selectedCategory.name}</CardTitle>
                    <CardDescription>{selectedCategory.description}</CardDescription>
                  </div>
                  {isAdminMode && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        if (isEditingCategory) {
                          handleEditCategory()
                        } else {
                          setIsEditingCategory(true)
                        }
                      }}
                    >
                      {isEditingCategory ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
                      {isEditingCategory ? 'Save' : 'Edit'}
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  {isEditingCategory && (
                    <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <div className="grid gap-4">
                        <div>
                          <Label htmlFor="edit-name">Category Name</Label>
                          <Input
                            id="edit-name"
                            value={selectedCategory.name}
                            onChange={(e) => setSelectedCategory(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-description">Description</Label>
                          <Textarea
                            id="edit-description"
                            value={selectedCategory.description}
                            onChange={(e) => setSelectedCategory(prev => ({ ...prev, description: e.target.value }))}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleEditCategory}>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                          <Button variant="outline" onClick={() => setIsEditingCategory(false)}>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  <Tabs defaultValue="lab-analyses" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="lab-analyses" className="flex items-center gap-2">
                        <TestTube className="h-4 w-4" />
                        Lab Analyses
                      </TabsTrigger>
                      <TabsTrigger value="blocked-countries" className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        Blocked Countries
                      </TabsTrigger>
                      <TabsTrigger value="label-requirements" className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        Label Requirements
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="lab-analyses" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-red-600">Mandatory</CardTitle>
                            {isAdminMode && isEditingCategory && (
                              <Button size="sm" variant="outline" onClick={() => {
                                const name = prompt('Analysis name:')
                                const details = prompt('Analysis details:')
                                if (name && details) addLabAnalysis('mandatory', { name, details })
                              }}>
                                <Plus className="h-3 w-3" />
                              </Button>
                            )}
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {selectedCategory.criteria.lab_analyses.mandatory.map((analysis, index) => (
                                <div key={index} className="p-2 bg-red-50 rounded border border-red-200">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h4 className="font-medium text-sm">{analysis.name}</h4>
                                      <p className="text-xs text-gray-600">{analysis.details}</p>
                                    </div>
                                    {isAdminMode && isEditingCategory && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeItem('mandatory', index)}
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-600">Optional</CardTitle>
                            {isAdminMode && isEditingCategory && (
                              <Button size="sm" variant="outline" onClick={() => {
                                const name = prompt('Analysis name:')
                                const details = prompt('Analysis details:')
                                if (name && details) addLabAnalysis('optional', { name, details })
                              }}>
                                <Plus className="h-3 w-3" />
                              </Button>
                            )}
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-2">
                              {selectedCategory.criteria.lab_analyses.optional.map((analysis, index) => (
                                <div key={index} className="p-2 bg-blue-50 rounded border border-blue-200">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h4 className="font-medium text-sm">{analysis.name}</h4>
                                      <p className="text-xs text-gray-600">{analysis.details}</p>
                                    </div>
                                    {isAdminMode && isEditingCategory && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeItem('optional', index)}
                                      >
                                        <X className="h-3 w-3" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="blocked-countries" className="space-y-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Blocked Countries</CardTitle>
                          {isAdminMode && isEditingCategory && (
                            <Button size="sm" variant="outline" onClick={() => {
                              const country_code = prompt('Country code (e.g., US, GB):')
                              const reason = prompt('Reason for blocking:')
                              if (country_code && reason) addBlockedCountry({ country_code, reason })
                            }}>
                              <Plus className="h-3 w-3" />
                            </Button>
                          )}
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {selectedCategory.criteria.blocked_countries.map((country, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                <div>
                                  <Badge variant="destructive" className="mr-2">{country.country_code}</Badge>
                                  <span className="text-sm">{country.reason}</span>
                                </div>
                                {isAdminMode && isEditingCategory && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeItem('blocked_countries', index)}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="label-requirements" className="space-y-4">
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">Label Requirements</CardTitle>
                          {isAdminMode && isEditingCategory && (
                            <Button size="sm" variant="outline" onClick={() => {
                              const requirement = prompt('Requirement name:')
                              const details = prompt('Requirement details:')
                              if (requirement && details) addLabelRequirement({ requirement, details })
                            }}>
                              <Plus className="h-3 w-3" />
                            </Button>
                          )}
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {selectedCategory.criteria.label_requirements.map((req, index) => (
                              <div key={index} className="p-3 bg-green-50 rounded border border-green-200">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className="font-medium text-sm text-green-800">{req.requirement}</h4>
                                    <p className="text-xs text-green-600 mt-1">{req.details}</p>
                                  </div>
                                  {isAdminMode && isEditingCategory && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeItem('label_requirements', index)}
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Category Selected</h3>
                    <p className="text-gray-500">Select a category from the sidebar or create a new one.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
