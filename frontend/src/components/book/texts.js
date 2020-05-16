export const bookTexts = {
	'calendarForm': {
		'saveBtn': 'Save',
		'fields': {
			'name': 'Añade un título',
			'date': 'Fecha',
			'time': 'Hora',
			'description': 'description',
		},
		'validate': {
			'error': 'Please enter at least 1 character',
		}
	},
	'eventDelete': {
		'modal': {
			'msg': 'Are you sure you want to delete this event?',
			'msgF': (event) =>  `Are you sure you want to delete the event: ${event}`,
			'deleteBtn': 'Delete',
			'cancelBtn': 'Cancel',
			'title': 'Delete Event',
		}
	},
	'eventList': {
		'list': {
			'editBtn': 'Edit',
			'deleteBtn': 'Delete',
			'noneMsg': 'No hay turnos agendados.',
			'noResultsMsg': 'No hay eventos con esa descripción',
		}
	},
	'stepperAppointment': {
		'saveBtn': 'Save',
		'validate': {
			'error': 'Please enter at least 1 character',
		}
	},
	'verticalLinearStepper': {
		'steps': {
			's1': 'Elige un día disponible para tu cita.',
			's2': 'Elige una hora disponible para tu cita.',
			's3': 'Comparte tu información de contacto con nosotros y te enviaremos un recordatorio.',
		},
		'fields': {
			'name': 'Añade un título',
			'date': 'Fecha',
			'time': 'Hora',
			'description': 'description',
		},
		'buttons': {
			'next': 'Siguiente',
			'reset': 'Inicio',
			'back': 'Atrás',
			'new': 'Solicar un nuevo turno',
		},
		'success': 'Turno agendado.',
		'error': 'Un error ha ocurrido, y no se ha podido guardar su turno.',
	}
}
