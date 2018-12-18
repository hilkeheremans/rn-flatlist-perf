# rn-flatlist-perf
Tinkering with RN Flatlist to see where its perf weaknesses lie

> This was really quick and dirty, no judging pls

FlatList was hooked up to two mini 'state' implementations (see `/state`):

- 'mutable' state that only mutates
- 'immutable' state that copies object contents where relevant to imitate classic Redux approach

setState is used in a parent to force a rerender (whereas in Redux this would be the role of connect()/deprecated context).

You will note that:
- two views are visible -- the top one is the mutable one, bottom is the immutable one
- for the 'mutable' state the flatlist does not update (flatlist is a purecomponent), except when the relevant components go outside of the overscroll's boundaries (= when they are unmounted)
- there are trackers for when a component gets mounted or updated. this will help you determine how flatlist renders and updates its items
- for the immutable state the flatlist cleanly updates when you add/update a component

Some suggested scenarios:
- open up app, check how many components get mounted
- use the buttons to:
  - add a new item at pos 10 to the mutable and immutable -- see how flatlist updates (or does not update at all)
  - add a new item at the end to the mutable and immutable -- see how flatlist updates (or does not update at all)
  - change an item at pos 10 -- it will not update in all cases except when the item went out of the overscroll area (because it unmounted and was remounted when it cane back into view).
  
  Fun stuff to know
  
