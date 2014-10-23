from google.appengine.ext import ndb
from google.appengine.ext import db
import textwrap

class Venue(ndb.Model):
  name = ndb.StringProperty()
  address = ndb.StringProperty()
  description = ndb.TextProperty()
  image = ndb.BlobProperty()
  caption = ndb.StringProperty()

