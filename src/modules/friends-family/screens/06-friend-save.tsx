import { View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
import { useLocalSearchParams, router } from 'expo-router'
import { useState } from 'react'
import { Typography } from '~/modules/ui/typography'
import { QuestionProgress } from '~/modules/friends-family/components/question-progress'
import { Button } from '~/modules/ui/button'
import { SvgIcon } from '~/modules/ui/svg-icon'
import type { FriendsInfo } from '~/services/api/model'
import { useSaveFamilyFamilyFriendsSaveFriendsPost } from '~/services/api/generated'

export function FriendSaveScreen() {
  const params = useLocalSearchParams()
  const initialFriendsData: FriendsInfo = params.friendsData
    ? JSON.parse(params.friendsData as string)
    : { friends: [] }

  const [friendsData, setFriendsData] = useState<FriendsInfo>(initialFriendsData)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({ name: '' })
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newFriendForm, setNewFriendForm] = useState({ name: '' })
  const [showEditError, setShowEditError] = useState(false)
  const [showNewError, setShowNewError] = useState(false)
  const [showValidationError, setShowValidationError] = useState(false)

  const saveFriends = useSaveFamilyFamilyFriendsSaveFriendsPost()

  const handleEdit = (index: number) => {
    const friendName = friendsData.friends[index]
    setEditingIndex(index)
    setEditForm({
      name: friendName,
    })
    setShowEditError(false)
    setShowValidationError(false)
  }

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      if (!editForm.name.trim()) {
        setShowEditError(true)
        return
      }

      const updatedFriends = [...friendsData.friends]
      updatedFriends[editingIndex] = editForm.name
      setFriendsData({ friends: updatedFriends })
      setEditingIndex(null)
      setEditForm({ name: '' })
      setShowEditError(false)
    }
  }

  const handleAddAnother = () => {
    setIsAddingNew(true)
    setNewFriendForm({ name: '' })
    setShowNewError(false)
    setShowValidationError(false)
  }

  const handleSaveNew = () => {
    if (!newFriendForm.name.trim()) {
      setShowNewError(true)
      return
    }

    const updatedFriends = [...friendsData.friends, newFriendForm.name]
    setFriendsData({ friends: updatedFriends })
    setIsAddingNew(false)
    setNewFriendForm({ name: '' })
    setShowNewError(false)
  }

  const handleRetryRecording = () => {
    router.push('/profile/friends-family/03-friend-question')
  }

  const handleSave = () => {
    // Validate all friends have names
    const hasEmptyFields = friendsData.friends.some((friend) => !friend.trim())

    if (hasEmptyFields) {
      setShowValidationError(true)
      return
    }

    setShowValidationError(false)

    saveFriends.mutate(
      {
        data: friendsData,
      },
      {
        onSuccess: () => {
          router.push('/profile/friends-family/05-save-complete')
        },
        onError: (error) => {
          Alert.alert('Error', 'Failed to save friends information. Please try again.')
          console.error('Save friends error:', error)
        },
      }
    )
  }

  return (
    <View className="flex-1 px-4 -mt-4">
      <QuestionProgress currentQuestion={2} totalQuestions={2} />

      <Typography brand level="h2" className="mt-8">
        Your Friends
      </Typography>

      <Typography level="body-1" className="mt-4">
        Make sure names are correct
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
        {friendsData?.friends?.map((friendName, index: number) => (
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
                      Name is Required
                    </Typography>
                  </View>
                )}

                <View className="bg-bg-secondary rounded-2xl overflow-hidden">
                  <View className="flex-row items-center px-4 py-4">
                    <Typography level="body-1" className="w-24">
                      Name
                    </Typography>
                    <View className="flex-1 flex-row items-center">
                      <TextInput
                        value={editForm.name}
                        onChangeText={(text) => {
                          setEditForm({ name: text })
                          setShowEditError(false)
                        }}
                        className="flex-1"
                        placeholder="John Smith"
                      />
                      <TouchableOpacity onPress={() => setEditForm({ name: '' })}>
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
                <SvgIcon name="people" size="lg" color="accent" />

                <Typography level="body-1" weight="medium" className="flex-1 ml-3">
                  {friendName}
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
                  Name is Required
                </Typography>
              </View>
            )}

            <View className="bg-bg-secondary rounded-2xl overflow-hidden">
              <View className="flex-row items-center px-4 py-4">
                <Typography level="body-1" className="w-24">
                  Name
                </Typography>
                <View className="flex-1 flex-row items-center">
                  <TextInput
                    value={newFriendForm.name}
                    onChangeText={(text) => {
                      setNewFriendForm({ name: text })
                      setShowNewError(false)
                    }}
                    className="flex-1"
                    placeholder="John Smith"
                  />
                  <TouchableOpacity onPress={() => setNewFriendForm({ name: '' })}>
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
        <TouchableOpacity onPress={handleRetryRecording} disabled={saveFriends.isPending}>
          <Typography color="secondary" className="text-center mb-4">
            Retry Recording
          </Typography>
        </TouchableOpacity>

        <Button size="lg" onPress={handleSave} disabled={saveFriends.isPending || editingIndex !== null || isAddingNew}>
          {saveFriends.isPending ? 'Saving...' : 'Save'}
        </Button>
      </View>
    </View>
  )
}
