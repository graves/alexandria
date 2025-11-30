# QUADRATURE OF THE PARABOLA

> Archimedes to Dositheus greeting.
>
> When I heard that Conon, who was my friend in his lifetime, was dead, but that you were acquainted with Conon and withal versed in geometry, while I grieved for the loss not only of a friend but of an admirable mathematician, I set myself the task of communicating to you, as I had intended to send to Conon, a certain geometrical theorem which had not been investigated before but which I have now investigated, and which I first discovered by means of mechanics and then exhibited by means of geometry.
>
> Now some of the earlier geometers tried to prove it possible to find a rectilineal area equal to a given circle and a given segment of a circle; and after that they endeavoured to square the area bounded by the section of the whole cone and a straight line, assuming lemmas not easily conceded, so that it was recognised by most people that the problem was not solved.
>
> But I am not aware that any one of my predecessors has attempted to square the segment bounded by a straight line and a section of a right-angled cone (a parabola), a problem of which I have now discovered the solution. For it is here shown that every segment bounded by a straight line and a section of a right-angled cone (a parabola) is four-thirds of the triangle which has the same base and equal height with the segment, and for the demonstration of this property the following lemma is assumed: that the excess by which the greater of two unequal areas exceeds the less can, by being added to itself, be made to exceed any given finite area.
>
> The earlier geometers have also used this lemma; for it is by the use of this same lemma that they have shown that circles are to one another in the duplicate ratio of their diameters, and that spheres are to one another in the triplicate ratio of their diameters, and further that every pyramid is one third part of the prism which has the same base with the pyramid and equal height; also, that every cone is one third part of the cylinder having the same base as the cone and equal height. They proved these by assuming a certain lemma similar to that aforesaid. And, in the result, each of the aforesaid theorems has been accepted no less than those proved without the lemma.
>
> As therefore my work now published has satisfied the same test as the propositions referred to, I have written out the proof and send it to you, first as investigated by means of mechanics, and afterwards too as demonstrated by geometry. Prefixed are, also, the elementary propositions in conics which are of service in the proof. Farewell.

## Preliminary Propositions (from the Elements on Conics)

Propositions 1–5. The following elementary properties of the parabola are employed (as in the treatises on conics by Euclid and Aristaeus).

### Proposition 1
If from a point P on a parabola a straight line be drawn which is either the axis or parallel to the axis, as PV, and if QQ' be a chord parallel to the tangent to the parabola at P and meeting PV in V, then
QV = VQ'.

Conversely, if QV = VQ', the chord QQ' will be parallel to the tangent at P.

### Proposition 2
If in a parabola QQ' be a chord parallel to the tangent at P, and if a straight line be drawn through P which is either the axis or parallel to the axis, and which meets QQ' in V and the tangent at Q to the parabola in T, then
PV = PT.

If from a point on a parabola a straight line be drawn which is either the axis or parallel to the axis, as PV, and if from two other points Q, Q' on the parabola straight lines be drawn parallel to the tangent at P and meeting PV in V, V' respectively, then
PV : PV' = QV^2 : Q'V'^2.

### Remark
These propositions are proved in the elements of conics.

### Proposition 4
If Qq be the base of any segment of a parabola, and P the vertex of the segment, and if the diameter through any other point R meet Qq in O and QP (produced if necessary) in F, then
QV : VO = OF : FR.

Proof. Draw the ordinate RW to PV, meeting QP in K.

Then PV : PW = QV^2 : RW^2;

whence, by parallels, PQ : PK = PQ^2 : PF^2.

That is, in the treatises on conics by Euclid and Aristaeus.

In other words, PQ, PF, PK are in continued proportion; therefore
PQ : PF = PF : PK
= PQ ± PF : PF ± PK
= QF : KF.

Hence, by parallels, QV : VO = OF : FR.

### Proposition 5
If Qq be the base of any segment of a parabola, P the vertex of the segment, and PV its diameter, and if the diameter of the parabola through any other point R meet Qq in O and the tangent at Q in E, then
QO : Oq = ER : RO.

Proof. Let the diameter through R meet QP in F. Then, by Proposition 4,
QV : VO = OF : FR.

Since QV = Vq, it follows that
QV : qO = OF : OR.  (1)

Also, if UP meet the tangent in T, PT = PV, and therefore EF = OF.
Accordingly, doubling the antecedents in (1), we have
Qq : qO = OE : OR,
whence QO : Oq = ER : RO.

## Propositions on the Equilibrium of Plane Areas (Mechanics)

Archimedes uses mechanics (centers of gravity, levers) to establish balance relations that are then applied geometrically.

### Propositions 6–7
Suppose a lever AOB placed horizontally and supported at its middle point O. Let a triangle BCD, in which the angle C is right or obtuse, be suspended from B and O, so that C is attached to O and CD is in the same vertical line with O. Then, if P be such an area as, when suspended from A, will keep the system in equilibrium,
area(P) = (1/3) × area(triangle BCD).

Proof. (Combined proof of the two cases.) Take a point E on OB such that BE = 2·OE, and draw EFH parallel to CD meeting BC, BD in F, H respectively. Let G be the middle point of FH. Then G is the centre of gravity of the triangle BCD. Hence, if the angular points B, C be set free and the triangle be suspended by attaching F to E, the triangle will hang in the same position as before, because EFG is a vertical straight line. Therefore, as before, there will be equilibrium. Thus
area(P) : area(triangle BCD) = OE : AO = 1 : 3,
or area(P) = (1/3) × area(triangle BCD).

### Propositions 8–9
Suppose a lever AOB placed horizontally and supported at its middle point O. Let a triangle BCD, right-angled or obtuse at C, be suspended from the points B, E on OB, the angular point C being so attached to E that the side CD is in the same vertical line with E. Let Q be an area such that
AO : OE = area(triangle BCD) : Q.

Then, if an area P suspended from A keeps the system in equilibrium,
P < area(triangle BCD) but P > Q.

Proof. Take G the centre of gravity of the triangle BCD, and draw GH parallel to DC (i.e., vertically), meeting BO in H. We may suppose the triangle suspended from H; since there is equilibrium,
area(triangle BCD) : P = AO : OH,
and
area(triangle BCD) : Q = AO : OE.
From these relations we deduce P < area(triangle BCD) and P > Q.

### Propositions 10–11
Suppose a lever AOB placed horizontally and supported at O, its middle point. Let CDEF be a trapezium which can be so placed that its parallel sides CD, FE are vertical while C is vertically below O, and the other sides CF, DE meet in B. Let EF meet BO in H, and let the trapezium be suspended by attaching F to H and C to O. Further, suppose Q to be an area such that
AO : OH = area(trapezium CDEF) : Q.

Then, if P be the area which, when suspended from A, keeps the system in equilibrium,
P < Q.

Proof. Divide OH in K so that
(2·CD + FE) : (2·FE + CD) = HK : KO.
Draw KG parallel to OD, and let G be the middle point of the portion of KG intercepted within the trapezium. Then G is the centre of gravity of the trapezium. Thus we may suppose the trapezium suspended from K, and the equilibrium will remain undisturbed. Therefore,
AO : OK = area(trapezium CDEF) : P,
and, by hypothesis,
AO : OH = area(trapezium CDEF) : Q.
Since OK < OH, it follows that P < Q.

### Propositions 12–13
If the trapezium CDEF be placed as in the last propositions, except that CD is vertically below a point L on OB instead of being below O, and the trapezium is suspended from L, H, suppose that Q, R are areas such that
AO : OH = area(trapezium CDEF) : Q,
and AO : OL = area(trapezium CDEF) : R.

If then an area P suspended from A keeps the system in equilibrium,
P > R but P < Q.

Proof. Take the centre of gravity G of the trapezium, as in the last propositions, and let the line through G parallel to DC meet OB in K. We may suppose the trapezium suspended from K, and there will still be equilibrium. Therefore
area(trapezium CDEF) : P = AO : OK.
Hence, since OK lies between OL and OH, we have P between R and Q.

## Applications to the Parabola

### Propositions 14–15
Let Qq be the base of any segment of a parabola. Then, if two lines be drawn from Q, q each parallel to the axis of the parabola and on the same side of Qq as the segment is, either (1) the angles so formed at Q, q are both right angles, or (2) one is acute and the other obtuse. In the latter case let the angle at q be the obtuse angle.

Divide Qq into any number of equal parts at the points O1, O2, …, On. Draw through q, O1, O2, …, On diameters of the parabola meeting the tangent at Q in E, E1, E2, …, En and the parabola itself in q, R1, R2, …, Rn. Join QR1, QR2, …, QRn meeting qE, O1E1, O2E2, …, On−1En−1 in F, F1, F2, …, Fn−1 respectively.

Let the diameters Eq, E1O1, …, EnOn meet a straight line QOA drawn through Q perpendicular to the diameters in the points O, H1, H2, …, Hn respectively. (In the particular case where Qq is itself perpendicular to the diameters, q will coincide with O, O1 with H1, and so on.)

It is required to prove that

1. area(EqQ) < 3 × (sum of trapezia FO1, F1O2, …, Fn−1On and area(EnOnQ)),
2. area(EqQ) > 3 × (sum of trapezia R1O2, R2O3, …, Rn−1On and area(RnOnQ)).

Proof. Suppose AO made equal to OQ, and conceive QOA as a lever placed horizontally and supported at O. Suppose the triangle EqQ suspended from OQ in the position drawn, and suppose that the trapezium EO1 in the position drawn is balanced by an area P1 suspended from A, the trapezium E1O2 in the position drawn is balanced by the area P2 suspended from A, and so on, the triangle EnOnQ being in like manner balanced by Pn+1.

Then P1 + P2 + … + Pn+1 will balance the whole triangle EqQ as drawn, and therefore P1 + P2 + … + Pn+1 = area(EqQ). [Props. 6, 7]

Again
AO : OH1 = QO : OH1
= Qq : qO1
= E1O1 : O1P1  [by means of Prop. 5]
= area(trapezium E1O1) : area(trapezium PO1);
whence [Props. 10, 11] area(PO1) > P1.

Next
AO : OH2 = E1O2 : O2R2
= area(P1O2) : area(R1O2),  (a)

while
AO : OH3 = E2O2 : O2R2
= area(E2O2) : area(P2O2).  (b)

Since (a) and (b) are simultaneously true, we have, by Props. 12, 13,
area(P1O2) > P2 > area(P1O2).

Similarly it may be proved that
area(P2O3) > P3 > area(P2O3),
and so on.

Lastly [Props. 8, 9]
area(EnOnQ) > Pn+1 > area(RnOnQ).

By addition, we obtain
area(FO1) + area(F1O2) + … + area(Fn−1On) + area(EnOnQ) > P1 + P2 + … + Pn+1 = area(EqQ),
or
area(EqQ) < 3 × (area(FO1) + area(F1O2) + … + area(Fn−1On) + area(EnOnQ)).

Similarly,
area(EqQ) > 3 × (area(R1O2) + area(R2O3) + … + area(Rn−1On) + area(RnOnQ)).

### Proposition 16
Suppose Qq to be the base of a parabolic segment, q being not more distant than Q from the vertex of the parabola. Draw through q the straight line qE parallel to the axis of the parabola to meet the tangent at Q in E. It is required to prove that
(area of segment) = (1/3) × area(EqQ).

Proof. For, if not, the area of the segment must be either greater or less than (1/3) area(EqQ).

I. Suppose the area of the segment greater than (1/3) area(EqQ). Then the excess can, if continually added to itself, be made to exceed area(EqQ). And it is possible to find a submultiple of the triangle EqQ less than the said excess of the segment over (1/3) area(EqQ).

Let the triangle FqQ be such a submultiple of the triangle EqQ. Divide Eq into equal parts each equal to qF, and let all the points of division including F be joined to Q meeting the parabola in P1, P2, …, Rn respectively. Through P1, P2, …, Rn draw diameters of the parabola meeting Qq in O1, O2, …, On respectively.

Let O1P1 meet QP2 in F1.
Let O2R2 meet QR1 in D1 and QR2 in P2.
Let O3P3 meet QR2 in D2 and QP4 in P3,
and so on.

We have, by hypothesis,
area(FqQ) < (area of segment) − (1/3) area(EqQ),
or
(area of segment) − area(FqQ) > (1/3) area(EqQ).  (a)

Now, since all the parts of qE, as qF and the rest, are equal, O1P1 = P1F1, O2D1 = D1P2 = P2F2, and so on; therefore
area(FqQ) = (area(FO1) + area(F1D1) + area(F2D2) + … + area(Fn−1Dn−1) + area(EnRnQ)).  (b)

But
(area of segment) < area(FO1 + F1O2 + … + Fn−1On + EnOnQ).

Subtracting, we have
(area of segment) − area(FqQ) < (area(R1O2) + area(R2O3) + … + area(Rn−1On) + area(RnOnQ)),
whence, a fortiori, by (a),
(1/3) area(EqQ) < (area(R1O2) + area(R2O3) + … + area(Rn−1On) + area(RnOnQ)).

But this is impossible, since [Props. 14, 15]
(1/3) area(EqQ) > (area(R1O2) + area(R2O3) + … + area(Rn−1On) + area(RnOnQ)).
Therefore (area of segment) < (1/3) area(EqQ) is impossible.

II. Suppose, if possible, that the area of the segment is less than (1/3) area(EqQ).

Take a submultiple of the triangle EqQ, as the triangle FqQ, less than the excess of (1/3) area(EqQ) over the area of the segment, and make the same construction as before.

Since area(FqQ) < (1/3) area(EqQ) − (area of segment), it follows that
area(FqQ) + (area of segment) < area(EqQ)  [Props. 14, 15].

Subtracting from each side the area of the segment, we have
area(FqQ) < (sum of the spaces qFR1, R1F1, R2F2, …, EnRnQ)
< (area(FO1) + area(F1D1) + … + area(Fn−1Dn−1) + area(EnRnQ)),
which is impossible because, by (b) above,
area(FqQ) = area(FO1) + area(F1D1) + … + area(Fn−1Dn−1) + area(EnRnQ).

Hence (area of segment) < (1/3) area(EqQ) is impossible.

Since then the area of the segment is neither less nor greater than (1/3) area(EqQ), it is equal to it.

### Proposition 17
It is now manifest that the area of any segment of a parabola is four-thirds of the triangle which has the same base as the segment and equal height.

Let Qq be the base of the segment, P its vertex. Then PQq is the inscribed triangle with the same base as the segment and equal height.

Since P is the vertex of the segment, the diameter through P bisects Qq. Let V be the point of bisection.

Let VP and qE drawn parallel to it meet the tangent at Q in T, E respectively.

Then, by parallels,
qE = 2·VT,
and PV = PT, [Prop. 2]
so that VT = 2·PV.

Hence area(EqQ) = 4 · area(PQq).

But, by Prop. 16, the area of the segment is equal to (1/3) area(EqQ).

Therefore (area of segment) = (4/3) · area(PQq).

Definition. In segments bounded by a straight line and any curve I call the straight line the base, and the height the greatest perpendicular drawn from the curve to the base of the segment, and the vertex the point from which the greatest perpendicular is drawn.

### Proposition 18
If Qq be the base of a segment of a parabola, and V the middle point of Qq, and if the diameter through V meet the curve in P, then P is the vertex of the segment.

For Qq is parallel to the tangent at P [Prop. 1]. Therefore, of all the perpendiculars which can be drawn from points on the segment to the base Qq, that from P is the greatest. Hence, by the definition, P is the vertex of the segment.

### Proposition 19
If Qq be a chord of a parabola bisected in V by the diameter PV, and if RM be a diameter bisecting QV in M, and RW be the ordinate from R to PV, then
PV = (1/4) RM.

Proof. By the property of the parabola,
PV : PW = QV^2 : RW^2 = 4·PW^2 : RW^2,
from which the proportional relations lead to PV = (1/4) RM.

### Proposition 20
If Qq be the base, and P the vertex, of a parabolic segment, then the triangle PQq is greater than half the segment.

For the chord Qq is parallel to the tangent at P, and the triangle PQq is half the parallelogram formed by Qq, the tangent at P, and the diameters through Q, q. Therefore the triangle PQq is greater than half the segment.

Corollary. It follows that it is possible to inscribe in the segment a polygon such that the segments left over are together less than any assigned area.

### Proposition 21
If Qq be the base, and P the vertex, of any parabolic segment, and if R be the vertex of the segment cut off by PQ, then
area(PQq) = 8 · area(PRQ).

Proof. The diameter through R will bisect the chord PQ, and therefore also QV, where PV is the diameter bisecting Qq. Let the diameter through R bisect PQ in Y and QV in M. Join PM.

By Prop. 19, PV = (1/4) RM. Also PV = 2·YM. Therefore YM = 2·RY, and area(PYM) = 2 · area(PRQ).

Hence area(PQV) = 4 · area(PRQ), and
area(PQq) = 8 · area(PRQ).

Also, if RW, the ordinate from R to PV, be produced to meet the curve again in r, RW = rW, and the same proof shows that
area(PQq) = 8 · area(Prq).

### Proposition 22
If there be a series of areas A, B, C, D, …, each of which is four times the next in order, and if the largest, A, be equal to the triangle PQq inscribed in a parabolic segment PQq and having the same base with it and equal height, then
A + B + C + D + … < (area of segment PQq).

Proof. Since area(PQq) = A, and area(PQR) + area(Pqr) = B (because each is one-fourth of the previous, by Proposition 21), and similarly the triangles in the remaining segments sum to C, and so on, the infinite sum A + B + C + … is equal to the area of a certain inscribed polygon, and is therefore less than the area of the segment.

### Proposition 23
Given a series of areas A, B, C, D, … of which A is the greatest, and each is equal to four times the next in order, then
A + B + C + D + … = (4/3) A.

Proof. Take areas b, c, d, … such that
b = (1/4) B, c = (1/4) C, d = (1/4) D, and so on.

Then, since b = (1/4) B, and B = (1/4) A,
B + b = (1/4) A.

Similarly C + c = (1/4) B, etc.

Therefore
B + C + D + … + b + c + d + … = (1/4)(A + B + C + …).

But
b + c + d + … = (1/4) (B + C + D + …).
Therefore, by subtraction,
A + B + C + D + … = (4/3) A.

### Proposition 24 (The Theorem)
Every segment bounded by a parabola and a chord Qq is equal to four-thirds of the triangle which has the same base as the segment and equal height.

Suppose K = (4/3) · area(PQq), where P is the vertex of the segment; we have then to prove that the area of the segment is equal to K.

For, if the segment be not equal to K, it must either be greater or less.

I. Suppose the area of the segment greater than K.

If then we inscribe in the segments cut off by PQ, Pq triangles which have the same base and equal height, i.e., triangles with the same vertices P, r as those of the segments, and if in the remaining segments we inscribe triangles in the same manner, and so on, we shall finally have segments remaining whose sum is less than the area by which the segment PQq exceeds K.

Therefore the polygon so formed must be greater than the area K; which is impossible, since [Prop. 23]
A + B + C + … = (4/3) A,
where A = area(PQq).

Thus the area of the segment cannot be greater than K.

II. Suppose, if possible, that the area of the segment is less than K.

If then A = area(PQq), B = (1/4) A, C = (1/4) B, and so on, until we arrive at an area X such that X is less than the difference between K and the segment, we have by Proposition 23 that
A + B + C + … + X = A = K.

Now, since K exceeds A + B + C + … + X by an area less than X, and the area of the segment by an area greater than X, it follows that
A + B + C + … + X > (area of the segment),
which is impossible, by Proposition 22 above.

Hence the segment is not less than K.

Thus, since the segment is neither greater nor less than K,
(area of segment PQq) = K = (4/3) · area(PQq).