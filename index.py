from controllers import home
from controllers import venue as view_venue
from controllers.edit import venue as edit_venue

import webapp2

application = webapp2.WSGIApplication([
    (r'/', home.HomePage),
    (r'/img', view_venue.Image),
    (r'/edit/venue/(\d+)', edit_venue.EditVenue),
    (r'/edit/venue', edit_venue.EditVenue),
    (r'/edit/venues', edit_venue.EditVenues),
    (r'/venue/(\d+)', view_venue.ViewVenue),
    (r'/venues', view_venue.ViewVenues),
], debug=True)
