import os
from google.appengine.ext import ndb
import webapp2
import jinja2

from models.venue import *

jinja_environment = jinja2.Environment(loader=jinja2.FileSystemLoader("views"))

class ViewVenues(webapp2.RequestHandler):
  def get(self):
    venues = Venue.query().fetch()
    template = jinja_environment.get_template("venues.html")
    self.response.out.write(template.render({"venues": venues}))

class ViewVenue(webapp2.RequestHandler):
  def get(self, id):
    v = Venue.get_by_id(int(id))
    template = jinja_environment.get_template("venue-detail.html")
    self.response.out.write(template.render({"venue": v}))

class Image(webapp2.RequestHandler):
  def get(self):
    v = Venue.get_by_id(int(self.request.get('img_id')))
    if v.image:
      self.response.headers['Content-Type'] = 'image/png'
      self.response.out.write(v.image)
    else:
      self.response.out.write('No image')