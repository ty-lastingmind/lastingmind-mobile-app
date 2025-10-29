import { View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { useState } from 'react'
import { Typography } from '~/modules/ui/typography'
import { QuestionProgress } from '~/modules/friends-family/components/question-progress'
import { Button } from '~/modules/ui/button'
import { SvgIcon } from '~/modules/ui/svg-icon'
import { useSaveFamilyFamilyFriendsSaveFamilyPost } from '~/services/api/generated'
import type { FamilyInfo } from '~/services/api/model'

export function FamilySaveScreen() {
  const params = useLocalSearchParams()
  const initialFamilyData: FamilyInfo = params.familyData ? JSON.parse(params.familyData as string) : { family: [] }

  // Capitalize the first letter of each word
  const capitalizeRelationship = (text: string) => {
    return text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  // Capitalize relationships in initial data
  const normalizedInitialData: FamilyInfo = {
    family: initialFamilyData.family.map((member) => ({
      ...member,
      relationship: capitalizeRelationship(member.relationship),
    })),
  }

  const [familyData, setFamilyData] = useState<FamilyInfo>(normalizedInitialData)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({ name: '', relationship: '' })
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newMemberForm, setNewMemberForm] = useState({ name: '', relationship: '' })
  const [showEditError, setShowEditError] = useState(false)
  const [showNewError, setShowNewError] = useState(false)
  const [showValidationError, setShowValidationError] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const saveFamily = useSaveFamilyFamilyFriendsSaveFamilyPost()

  const handleEdit = (index: number) => {
    const member = familyData.family[index]
    setEditingIndex(index)
    setEditForm({
      name: member.name,
      relationship: member.relationship,
    })
    setShowEditError(false)
    setShowValidationError(false)
  }

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      if (!editForm.name.trim() || !editForm.relationship.trim()) {
        setShowEditError(true)
        return
      }

      const updatedFamily = [...familyData.family]
      updatedFamily[editingIndex] = {
        name: editForm.name,
        relationship: capitalizeRelationship(editForm.relationship),
      }
      setFamilyData({ family: updatedFamily })
      setEditingIndex(null)
      setEditForm({ name: '', relationship: '' })
      setShowEditError(false)
    }
  }

  const handleAddAnother = () => {
    setIsAddingNew(true)
    setNewMemberForm({ name: '', relationship: '' })
    setShowNewError(false)
    setShowValidationError(false)
  }

  const handleSaveNew = () => {
    if (!newMemberForm.name.trim() || !newMemberForm.relationship.trim()) {
      setShowNewError(true)
      return
    }

    const updatedFamily = [
      ...familyData.family,
      {
        name: newMemberForm.name,
        relationship: capitalizeRelationship(newMemberForm.relationship),
      },
    ]
    setFamilyData({ family: updatedFamily })
    setIsAddingNew(false)
    setNewMemberForm({ name: '', relationship: '' })
    setShowNewError(false)
  }

  const handleRetryRecording = () => {
    router.push('/profile/friends-family/02-family-question')
  }

  const handleSave = () => {
    // Validate all family members have both name and relationship
    const hasEmptyFields = familyData.family.some((member) => !member.name.trim() || !member.relationship.trim())

    if (hasEmptyFields) {
      setShowValidationError(true)
      return
    }

    setShowValidationError(false)

    saveFamily.mutate(
      {
        data: familyData,
      },
      {
        onSuccess: () => {
          setIsSaved(true)
          setTimeout(() => {
            router.push('/profile/friends-family/03-friend-question')
          }, 3000)
        },
        onError: (error) => {
          Alert.alert('Error', 'Failed to save family information. Please try again.')
          console.error('Save family error:', error)
        },
      }
    )
  }

  if (isSaved) {
    return (
      <View className="flex-1 items-center justify-start pt-10 bg-bg-primary">
        <Typography level="h1" weight="bold" color="accent" brand className="text-center">
          Response{'\n'}Saved!
        </Typography>
      </View>
    )
  }

  return (
    <View className="flex-1 px-4 -mt-4">
      <QuestionProgress currentQuestion={1} totalQuestions={2} />

      <Typography brand level="h2" className="mt-8">
        Your Family Members
      </Typography>

      <Typography level="body-1" className="mt-4">
        Make sure names and relationships are correct
      </Typography>

      {showValidationError && (
        <View className="flex-row items-center px-4 py-3 mt-4">
          <View className="w-6 h-6 rounded-full bg-orange-500 items-center justify-center mr-2">
            <Typography level="body-2" weight="bold" className="text-white">
              !
            </Typography>
          </View>
          <Typography level="body-2" className="flex-1">
            All Fields are Required
          </Typography>
        </View>
      )}

      <ScrollView className="flex-1 mt-6" showsVerticalScrollIndicator={false}>
        {familyData?.family?.map((member, index: number) => (
          <View key={index} className="mb-3">
            {editingIndex === index ? (
              <>
                {showEditError && (
                  <View className="flex-row items-center px-4 py-3 mb-3">
                    <View className="w-6 h-6 rounded-full bg-orange-500 items-center justify-center mr-2">
                      <Typography level="body-2" weight="bold" className="text-white">
                        !
                      </Typography>
                    </View>
                    <Typography level="body-2" className="flex-1">
                      All Fields are Required
                    </Typography>
                  </View>
                )}

                <View className="bg-bg-secondary rounded-2xl overflow-hidden">
                  <View className="flex-row items-center px-4 py-4">
                    <Typography level="body-1" className="w-32">
                      Relationship
                    </Typography>
                    <TextInput
                      value={editForm.relationship}
                      onChangeText={(text) => {
                        setEditForm({ ...editForm, relationship: text })
                        setShowEditError(false)
                      }}
                      className="flex-1"
                      placeholder="Grandfather"
                    />
                  </View>

                  <View className="h-[1px] bg-gray-300" />

                  <View className="flex-row items-center px-4 py-4">
                    <Typography level="body-1" className="w-32">
                      Name
                    </Typography>
                    <View className="flex-1 flex-row items-center">
                      <TextInput
                        value={editForm.name}
                        onChangeText={(text) => {
                          setEditForm({ ...editForm, name: text })
                          setShowEditError(false)
                        }}
                        className="flex-1"
                        placeholder="Jack"
                      />
                      <TouchableOpacity onPress={() => setEditForm({ ...editForm, name: '' })}>
                        <SvgIcon name="close" size="md" color="secondary" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <TouchableOpacity onPress={handleSaveEdit} className="py-4">
                  <Typography level="body-1" className="text-center">
                    Save
                  </Typography>
                </TouchableOpacity>
              </>
            ) : (
              <View className="bg-bg-secondary rounded-2xl p-4 flex-row items-center">
                <SvgIcon name="family" size="lg" color="accent" />

                <Typography level="body-1" weight="medium" className="flex-1 ml-3">
                  {member.name}, {member.relationship}
                </Typography>

                <TouchableOpacity onPress={() => handleEdit(index)} className="ml-2">
                  <SvgIcon name="editbox" size="lg" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

        {isAddingNew ? (
          <View className="mb-3">
            {showNewError && (
              <View className="flex-row items-center px-4 py-3 mb-3">
                <View className="w-6 h-6 rounded-full bg-orange-500 items-center justify-center mr-2">
                  <Typography level="body-2" weight="bold" className="text-white">
                    !
                  </Typography>
                </View>
                <Typography level="body-2" className="flex-1">
                  All Fields are Required
                </Typography>
              </View>
            )}

            <View className="bg-bg-secondary rounded-2xl overflow-hidden">
              <View className="flex-row items-center px-4 py-4">
                <Typography level="body-1" className="w-32">
                  Relationship
                </Typography>
                <TextInput
                  value={newMemberForm.relationship}
                  onChangeText={(text) => {
                    setNewMemberForm({ ...newMemberForm, relationship: text })
                    setShowNewError(false)
                  }}
                  className="flex-1"
                  placeholder="Grandfather"
                />
              </View>

              <View className="h-[1px] bg-gray-300" />

              <View className="flex-row items-center px-4 py-4">
                <Typography level="body-1" className="w-32">
                  Name
                </Typography>
                <View className="flex-1 flex-row items-center">
                  <TextInput
                    value={newMemberForm.name}
                    onChangeText={(text) => {
                      setNewMemberForm({ ...newMemberForm, name: text })
                      setShowNewError(false)
                    }}
                    className="flex-1"
                    placeholder="Jack"
                  />
                  <TouchableOpacity onPress={() => setNewMemberForm({ ...newMemberForm, name: '' })}>
                    <SvgIcon name="close" size="md" color="secondary" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <TouchableOpacity onPress={handleSaveNew} className="py-4">
              <Typography level="body-1" className="text-center">
                Save
              </Typography>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handleAddAnother}>
            <Typography level="body-1" className="text-center mt-2">
              Add another
            </Typography>
          </TouchableOpacity>
        )}
      </ScrollView>

      <View className="pb-12 px-8 mt-4">
        <TouchableOpacity onPress={handleRetryRecording} disabled={saveFamily.isPending}>
          <Typography color="secondary" className="text-center mb-4">
            Retry Recording
          </Typography>
        </TouchableOpacity>

        <Button size="lg" onPress={handleSave} disabled={saveFamily.isPending || editingIndex !== null || isAddingNew}>
          {saveFamily.isPending ? 'Saving...' : 'Save'}
        </Button>
      </View>
    </View>
  )
}
