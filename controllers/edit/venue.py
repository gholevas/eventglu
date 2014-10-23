import os
from google.appengine.ext import ndb
from google.appengine.ext import db
import webapp2
import jinja2
import logging


from models.venue import *

jinja_environment = jinja2.Environment(loader=jinja2.FileSystemLoader("views/edit"))

class EditVenues(webapp2.RequestHandler):
  def get(self):
    venues = Venue.query().fetch()
    template = jinja_environment.get_template("venues.html")
    self.response.out.write(template.render({"venues": venues}))

class EditVenue(webapp2.RequestHandler):
  def get(self, id):
    #v = ndb.Key('Venue',id).get()
    v = Venue.get_by_id(int(id))
    template = jinja_environment.get_template("venue.html")
    self.response.out.write(template.render({"venue": v}))
  def delete(self, id):
    v = Venue.get_by_id(int(id))
    v.key.delete()
  def post(self, id=None):
    v = Venue()
    if self.request.get('id'):
      v2 = Venue.get_by_id(int(id))
      #v2 = Venue.query(self.request.get('id')).fetch()
      if v2:
        v = v2
    v.name = self.request.get('name')
    v.address = self.request.get('address')
    v.description = self.request.get('description')
    v.caption = self.request.get('caption')
    image = self.request.get('img')
    if image:
      v.image = db.Blob(image)
    v.put()
    self.redirect('/edit/venue/'+str(v.key.id()))
