import React from 'react'
import styles from './Notification.module.scss'

interface NotificationProps {
	text: string
	context: 'success' | 'danger' | 'info'
}

export default function PopupNotification({
	text,
	context,
}: NotificationProps) {
	return (
		<div className={`${styles.notification} ${styles[context]}`}>{text}</div>
	)
}
