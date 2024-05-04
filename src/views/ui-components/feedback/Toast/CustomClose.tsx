import toast from '@/components/ui/toast'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'

const CustomClose = () => {
    function closeNotification(key: string) {
        toast.remove(key)
    }

    function openNotification() {
        const notificationKey = toast.push(
            <Notification title="Mesasge" duration={0}>
                <div>
                    The fat cat sat on the mat bat away with paws annoy owner.
                </div>
                <div className="text-right mt-3">
                    <Button
                        size="xs"
                        variant="solid"
                        className="mr-2"
                        onClick={() =>
                            closeNotification(notificationKey as string)
                        }
                    >
                        Confirm
                    </Button>
                    <Button
                        size="xs"
                        onClick={() =>
                            closeNotification(notificationKey as string)
                        }
                    >
                        Close
                    </Button>
                </div>
            </Notification>
        )
    }

    return <Button onClick={openNotification}>Show toast</Button>
}

export default CustomClose
