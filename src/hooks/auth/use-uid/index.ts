import useUser from '../use-user'

export function useUid() {
  return useUser().data?.uid
}
